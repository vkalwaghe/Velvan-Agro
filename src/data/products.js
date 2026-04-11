export const products = {

  fertilizers: [
    {
      id: 'npk-graded',
      name: 'NPK Graded Fertilizer',
      category: 'Fertilizer',
      bestSeller: true,
      description: 'Balanced NPK nutrients',
      price: 850,
      unit: 'kg',
      image: 'https://5.imimg.com/data5/SELLER/Default/2021/8/FW/PK/IW/67673073/612lj7lhwts-sl1181-jpg-500x500.jpg',
    },
    {
      id: 'urea',
      name: 'Urea (46% N)',
      category: 'Fertilizer',
      bestSeller: false,
      description: 'High nitrogen fertilizer',
      price: 490,
      unit: 'kg',
      image: 'https://agroblend.com/wp-content/uploads/2025/01/UREA-46-N-46-Azot.webp',
    },

    // 🔽 ADDED PRODUCTS
    ...Array.from({ length: 18 }, (_, i) => ({
      id: `fert-${i}`,
      name: `Advanced Fertilizer ${i + 1}`,
      category: 'Fertilizer',
      bestSeller: i % 3 === 0,
      description: 'Improves soil fertility and crop yield.',
      price: 500 + i * 20,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4',
    })),
  ],

  pesticides: [
    {
      id: 'weed-control',
      name: 'Weed Control Spray',
      category: 'Pesticide',
      bestSeller: true,
      description: 'Controls weeds',
      price: 650,
      unit: 'litre',
      image: 'https://tse3.mm.bing.net/th/id/OIP.EmZfL240k-MV3lH6reJ3iAHaHa',
    },

    ...Array.from({ length: 20 }, (_, i) => ({
      id: `pest-${i}`,
      name: `Pesticide Spray ${i + 1}`,
      category: 'Pesticide',
      bestSeller: i % 4 === 0,
      description: 'Protects crops from harmful pests.',
      price: 600 + i * 15,
      unit: 'litre',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
    })),
  ],

  fungicides: [
    {
      id: 'fungi-shield',
      name: 'Fungi Shield',
      category: 'Fungicide',
      bestSeller: false,
      description: 'Fungal protection',
      price: 740,
      unit: 'litre',
      image: 'https://m.media-amazon.com/images/I/414cNU1zNPL._AC_SS450_.jpg',
    },

    ...Array.from({ length: 20 }, (_, i) => ({
      id: `fung-${i}`,
      name: `Fungicide Pro ${i + 1}`,
      category: 'Fungicide',
      bestSeller: i % 5 === 0,
      description: 'Prevents fungal infections.',
      price: 700 + i * 18,
      unit: 'litre',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9',
    })),
  ],

  herbicides: [
    {
      id: 'weed-kill',
      name: 'Weed Kill Pro',
      category: 'Herbicide',
      bestSeller: true,
      description: 'Weed control',
      price: 760,
      unit: 'litre',
      image: 'https://www.mitre10.com.au/media/catalog/product/7/1/7163579-0_1.jpg',
    },

    ...Array.from({ length: 20 }, (_, i) => ({
      id: `herb-${i}`,
      name: `Herbicide Max ${i + 1}`,
      category: 'Herbicide',
      bestSeller: i % 3 === 0,
      description: 'Eliminates unwanted weeds.',
      price: 720 + i * 20,
      unit: 'litre',
      image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4',
    })),
  ],

  seeds: [
    {
      id: 'hybrid-rice',
      name: 'Hybrid Rice Seeds',
      category: 'Seed',
      bestSeller: false,
      description: 'High yield seeds',
      price: 1250,
      unit: 'kg',
      image: 'https://tse4.mm.bing.net/th/id/OIP.UhnNk_n5VppWLmWmJwb4yAAAAA',
    },

    ...Array.from({ length: 20 }, (_, i) => ({
      id: `seed-${i}`,
      name: `Hybrid Seed ${i + 1}`,
      category: 'Seed',
      bestSeller: i % 4 === 0,
      description: 'High germination rate seeds.',
      price: 1000 + i * 30,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
    })),
  ],

}