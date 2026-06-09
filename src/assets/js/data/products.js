// =======================================================
// BE BEAUTIFUL - CATÁLOGO DE PRODUCTOS
// =======================================================

const PRODUCTS = [

    // SKINCARE FACIAL
  

    {
        id: "B001",
        name: "Limpiador Facial en Gel",
        category: "Skincare Facial",
        price: 38000,
        stock: 40,
        image: "assets/images/B001-limpiador-facial.jpg",
        description: "Limpiador facial en gel diseñado para eliminar impurezas, exceso de grasa y residuos de maquillaje sin alterar la barrera natural de la piel.",
        features: ["Uso diario", "Todo tipo de piel", "Limpieza profunda"]
    },

    {
        id: "B002",
        name: "Serum de Vitamina C",
        category: "Skincare Facial",
        price: 55000,
        stock: 35,
        image: "assets/images/B002-serum-vitamina-c.jpg",
        description: "Sérum antioxidante enriquecido con vitamina C que ayuda a iluminar la piel, mejorar el tono y aportar luminosidad.",
        features: ["Vitamina C", "Antioxidante", "Iluminador"]
    },

    {
        id: "B003",
        name: "Serum de Ácido Hialurónico",
        category: "Skincare Facial",
        price: 48000,
        stock: 37,
        image: "assets/images/B003-serum-hialuronico.jpg",
        description: "Tratamiento hidratante intensivo que ayuda a mantener la piel suave, flexible y visiblemente saludable.",
        features: ["Hidratación profunda", "Uso diario", "Absorción rápida"]
    },

    {
        id: "B004",
        name: "Crema Hidratante Reparadora de Barrera",
        category: "Skincare Facial",
        price: 62000,
        stock: 28,
        image: "assets/images/B004-crema-reparadora.jpg",
        description: "Crema formulada para fortalecer la barrera cutánea y proporcionar hidratación prolongada.",
        features: ["Reparación", "Hidratación", "Protección"]
    },

    {
        id: "B005",
        name: "Protector Solar Facial SPF 50",
        category: "Skincare Facial",
        price: 58000,
        stock: 45,
        image: "assets/images/B005-protector-solar.jpg",
        description: "Protector solar de amplio espectro SPF 50 para proteger la piel frente a los rayos UVA y UVB.",
        features: ["SPF 50", "Uso diario", "Protección UV"]
    },

    {
        id: "B006",
        name: "Tónico Facial Hidratante",
        category: "Skincare Facial",
        price: 42000,
        stock: 30,
        image: "assets/images/B006-tonico-facial.jpg",
        description: "Tónico refrescante que ayuda a equilibrar el pH y preparar la piel para otros tratamientos.",
        features: ["Equilibra pH", "Refrescante", "Hidratante"]
    },

    {
        id: "B007",
        name: "Mascarilla Facial Hidratante",
        category: "Skincare Facial",
        price: 25000,
        stock: 50,
        image: "assets/images/B007-mascarilla-facial.jpg",
        description: "Mascarilla de hidratación intensiva que aporta suavidad y frescura inmediata.",
        features: ["Hidratación", "Fácil aplicación", "Efecto refrescante"]
    },

    {
        id: "B008",
        name: "Contorno de Ojos",
        category: "Skincare Facial",
        price: 46000,
        stock: 22,
        image: "assets/images/B008-contorno-ojos.jpg",
        description: "Tratamiento para el área del contorno de ojos que ayuda a mejorar la apariencia de cansancio.",
        features: ["Contorno ocular", "Uso diario", "Textura ligera"]
    },

 
    // BEAUTY TECH FACIAL
    

    {
        id: "B009",
        name: "Cepillo Facial Sónico",
        category: "Beauty Tech Facial",
        price: 95000,
        stock: 18,
        image: "assets/images/B009-cepillo-sonico.jpg",
        description: "Dispositivo de limpieza facial con vibraciones sónicas para una limpieza más profunda.",
        features: ["Tecnología sónica", "Recargable", "Resistente al agua"]
    },

    {
        id: "B010",
        name: "Vaporizador Facial Portátil",
        category: "Beauty Tech Facial",
        price: 110000,
        stock: 14,
        image: "assets/images/B010-vaporizador-facial.jpg",
        description: "Genera una fina bruma para complementar rutinas de hidratación facial.",
        features: ["Portátil", "Recargable", "Hidratación"]
    },

    {
        id: "B011",
        name: "Espátula Ultrasónica Facial",
        category: "Beauty Tech Facial",
        price: 125000,
        stock: 12,
        image: "assets/images/B011-espatula-ultrasonica.jpg",
        description: "Herramienta facial que utiliza vibraciones ultrasónicas para ayudar en la limpieza superficial.",
        features: ["Ultrasónica", "Recargable", "Fácil uso"]
    },

    {
        id: "B012",
        name: "Máscara LED Facial",
        category: "Beauty Tech Facial",
        price: 185000,
        stock: 10,
        image: "assets/images/B012-mascara-led.jpg",
        description: "Máscara con diferentes modos de luz LED para complementar rutinas faciales.",
        features: ["LED", "Múltiples modos", "Uso doméstico"]
    },

    {
        id: "B013",
        name: "Masajeador Facial de Microcorriente",
        category: "Beauty Tech Facial",
        price: 160000,
        stock: 11,
        image: "assets/images/B013-microcorriente.jpg",
        description: "Dispositivo facial diseñado para complementar tratamientos de cuidado de la piel.",
        features: ["Microcorriente", "Portátil", "Recargable"]
    },

    {
        id: "B014",
        name: "Rodillo Facial Eléctrico Frío/Calor",
        category: "Beauty Tech Facial",
        price: 98000,
        stock: 16,
        image: "assets/images/B014-rodillo-frio-calor.jpg",
        description: "Rodillo eléctrico con funciones de frío y calor para complementar rutinas faciales.",
        features: ["Frío/Calor", "Recargable", "Portátil"]
    },


    // BELLEZA ELÉCTRICA CAPILAR Y PERSONAL


    {
        id: "B015",
        name: "Plancha Alisadora de Cabello",
        category: "Belleza Eléctrica",
        price: 145000,
        stock: 20,
        image: "assets/images/B015-plancha-cabello.jpg",
        description: "Plancha alisadora con placas de cerámica para un peinado uniforme.",
        features: ["Cerámica", "Control de temperatura", "Uso profesional"]
    },

    {
        id: "B016",
        name: "Secador de Cabello Profesional",
        category: "Belleza Eléctrica",
        price: 175000,
        stock: 15,
        image: "assets/images/B016-secador-profesional.jpg",
        description: "Secador de alto rendimiento con múltiples niveles de potencia.",
        features: ["Alta potencia", "Boquilla concentradora", "Ligero"]
    },

    {
        id: "B017",
        name: "Rizador Automático de Cabello",
        category: "Belleza Eléctrica",
        price: 155000,
        stock: 13,
        image: "assets/images/B017-rizador-automatico.jpg",
        description: "Herramienta diseñada para crear rizos y ondas de forma práctica.",
        features: ["Automático", "Control térmico", "Fácil uso"]
    },

    {
        id: "B018",
        name: "Cepillo Alisador Eléctrico",
        category: "Belleza Eléctrica",
        price: 135000,
        stock: 17,
        image: "assets/images/B018-cepillo-alisador.jpg",
        description: "Cepillo térmico que ayuda a alisar y peinar el cabello rápidamente.",
        features: ["Alisado rápido", "Control de temperatura", "Ergonómico"]
    },

    {
        id: "B019",
        name: "Depilador Facial Eléctrico",
        category: "Belleza Eléctrica",
        price: 82000,
        stock: 24,
        image: "assets/images/B019-depilador-facial.jpg",
        description: "Dispositivo portátil para eliminación precisa de vello facial.",
        features: ["Portátil", "Precisión", "Recargable"]
    },

    {
        id: "B020",
        name: "Lámpara UV/LED para Uñas",
        category: "Belleza Eléctrica",
        price: 88000,
        stock: 19,
        image: "assets/images/B020-lampara-unas.jpg",
        description: "Lámpara UV/LED para secado y curado de esmaltes semipermanentes.",
        features: ["UV/LED", "Temporizador", "Uso doméstico y profesional"]
    }
];



