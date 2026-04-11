import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
} from "react-leaflet";
import { useParams } from "react-router-dom";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./OrderTracking.css";

// 📍 Icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
});

const deliveryIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

export default function OrderTracking() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [bikePosition, setBikePosition] = useState(null);
  const [route, setRoute] = useState([]);
  const [status, setStatus] = useState("Preparing 📦");
  const [eta, setEta] = useState(15);
  const [stepIndex, setStepIndex] = useState(0);

  // 📦 Load Order
  useEffect(() => {
    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const found = orders.find(
      (o) => o.id.toString() === id
    );

    setOrder(found);
  }, [id]);

  // 📍 Get User Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setUserLocation(coords);

        // Fake warehouse location (you can change later)
        const warehouse = [19.076, 72.8777];

        fetchRoute(warehouse, coords);
      },
      () => {
        // fallback
        const fallback = [19.076, 72.8777];
        setUserLocation(fallback);
        fetchRoute([19.076, 72.8777], fallback);
      }
    );
  }, []);

  // 🛣️ Fetch REAL ROAD ROUTE (OSRM)
  async function fetchRoute(start, end) {
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );

      const data = await res.json();

      const coordinates =
        data.routes[0].geometry.coordinates;

      const formatted = coordinates.map((c) => [
        c[1],
        c[0],
      ]);

      setRoute(formatted);
      setBikePosition(formatted[0]);

    } catch (err) {
      console.error("Route error:", err);
    }
  }

  // 🚚 Animate Bike Movement
  useEffect(() => {
    if (!route.length) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1;

        if (next >= route.length) {
          setStatus("Delivered ✅");
          setEta(0);
          clearInterval(interval);
          return prev;
        }

        setBikePosition(route[next]);

        // 📦 Status Logic
        if (next > route.length * 0.3) {
          setStatus("Shipped 📦");
        }
        if (next > route.length * 0.6) {
          setStatus("Out for Delivery 🚚");
        }

        // ⏱️ ETA Logic
        const remaining = route.length - next;
        setEta(Math.max(Math.round(remaining / 5), 0));

        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [route]);

  // 🔔 Arrival Notification
  useEffect(() => {
    if (eta === 2) {
      alert("🚚 Arriving in 2 minutes!");
    }
  }, [eta]);

  if (!order || !userLocation) {
    return <h2>Loading tracking...</h2>;
  }

  return (
    <div className="tracking-page">

      <h2>Tracking Order #{order.id}</h2>

      <p className="status">{status}</p>

      <p className="eta">
        ⏱️ ETA: {eta} mins
      </p>

      {/* 🗺️ MAP */}
      <MapContainer
        center={userLocation}
        zoom={14}
        className="map"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📍 User */}
        <Marker position={userLocation} icon={userIcon} />

        {/* 🚚 Delivery */}
        {bikePosition && (
          <Marker position={bikePosition} icon={deliveryIcon} />
        )}

        {/* 🛣️ Route */}
        {route.length > 0 && (
          <Polyline positions={route} />
        )}
      </MapContainer>

      {/* 📦 ITEMS */}
      <div className="tracking-items">
        <h3>Items</h3>

        {order.items.map((item) => (
          <p key={item.id}>
            {item.name} x {item.qty}
          </p>
        ))}
      </div>

    </div>
  );
}