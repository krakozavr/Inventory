// Realistic Inventory Data Generator for Business Application
// Generates 1500+ SKUs across multiple categories

const INVENTORY_DATABASE = [];

// Fictional Manufacturers
const MANUFACTURERS = {
    clothing: ['Attire Co.', 'Garment Works', 'Thread & Stitch', 'Fabric Masters', 'StyleCraft Ltd.', 'WearWell Inc.'],
    shoes: ['Footware Co.', 'SoleTech Inc.', 'StepRight Ltd.', 'Stride Manufacturers', 'WalkWell Corp.'],
    accessories: ['AccessoryCraft', 'DetailWorks Inc.', 'Finishing Touch Co.', 'Style Accent Ltd.']
};

// Size ranges
const SIZES = {
    menShirts: ['S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL'],
    womenShirts: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    menPants: ['30x30', '30x32', '32x30', '32x32', '34x30', '34x32', '36x30', '36x32', '38x32', '40x32'],
    womenPants: ['0', '2', '4', '6', '8', '10', '12', '14', '16'],
    shoes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    oneSize: ['One Size']
};

// Color palettes
const COLORS = {
    basic: ['Black', 'White', 'Navy', 'Gray', 'Charcoal'],
    extended: ['Black', 'White', 'Navy', 'Gray', 'Charcoal', 'Brown', 'Tan', 'Olive', 'Burgundy'],
    bright: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink'],
    neutral: ['Beige', 'Cream', 'Taupe', 'Stone', 'Sand']
};

// Helper function to generate realistic stock numbers
function generateStock() {
    const total = Math.floor(Math.random() * 500) + 50;
    const sold = Math.floor(total * (Math.random() * 0.6 + 0.1)); // 10-70% sold
    const hold = Math.floor((total - sold) * (Math.random() * 0.2)); // 0-20% on hold
    const requested = Math.floor(Math.random() * 30);
    const available = total - sold - hold;

    return { total, sold, hold, requested, available };
}

// Helper function to generate realistic prices
function generatePrice(basePrice) {
    const wholesale = basePrice;
    const retail = wholesale * (Math.random() * 0.6 + 1.8); // 1.8-2.4x markup
    const msrp = retail * 1.25;

    return {
        wholesale: Math.round(wholesale * 100) / 100,
        retail: Math.round(retail * 100) / 100,
        msrp: Math.round(msrp * 100) / 100
    };
}

// Generate product variants
function generateProduct(config) {
    const { sku, name, category, subcategory, gender, basePrice, sizes, colors, manufacturer } = config;
    const stock = generateStock();
    const pricing = generatePrice(basePrice);

    return {
        sku,
        name,
        category,
        subcategory,
        gender,
        manufacturer,
        ...stock,
        ...pricing,
        sizes: sizes.join(', '),
        colors: colors.join(', ')
    };
}

// ===== MEN'S CLOTHING =====
const menClothingSubcategories = [
    {
        code: 'DRS',
        name: 'Dress Shirts',
        items: [
            'Classic Dress Shirt', 'Slim Fit Dress Shirt', 'Regular Fit Dress Shirt',
            'Non-Iron Dress Shirt', 'Performance Dress Shirt', 'Stretch Dress Shirt',
            'French Cuff Dress Shirt', 'Button Down Dress Shirt', 'Point Collar Dress Shirt',
            'Spread Collar Dress Shirt'
        ],
        sizes: SIZES.menShirts,
        colors: ['White', 'Light Blue', 'Navy', 'Black', 'Gray', 'Pink'],
        basePrice: 35
    },
    {
        code: 'CAS',
        name: 'Casual Shirts',
        items: [
            'Oxford Shirt', 'Chambray Shirt', 'Denim Shirt', 'Flannel Shirt',
            'Linen Shirt', 'Poplin Shirt', 'Canvas Shirt', 'Twill Shirt',
            'Corduroy Shirt', 'Utility Shirt'
        ],
        sizes: SIZES.menShirts,
        colors: COLORS.extended,
        basePrice: 30
    },
    {
        code: 'POL',
        name: 'Polo Shirts',
        items: [
            'Classic Polo', 'Slim Fit Polo', 'Performance Polo', 'Pique Polo',
            'Jersey Polo', 'Stretch Polo', 'Long Sleeve Polo', 'Striped Polo'
        ],
        sizes: SIZES.menShirts,
        colors: COLORS.extended.concat(['Burgundy', 'Forest Green']),
        basePrice: 28
    },
    {
        code: 'TEE',
        name: 'T-Shirts',
        items: [
            'Crew Neck Tee', 'V-Neck Tee', 'Henley Tee', 'Pocket Tee',
            'Long Sleeve Tee', 'Performance Tee', 'Premium Cotton Tee', 'Graphic Tee'
        ],
        sizes: SIZES.menShirts,
        colors: COLORS.basic.concat(COLORS.bright),
        basePrice: 15
    },
    {
        code: 'SWT',
        name: 'Sweaters',
        items: [
            'Crewneck Sweater', 'V-Neck Sweater', 'Cardigan', 'Pullover',
            'Quarter Zip Sweater', 'Turtleneck', 'Cable Knit Sweater', 'Merino Sweater'
        ],
        sizes: SIZES.menShirts,
        colors: COLORS.extended,
        basePrice: 45
    },
    {
        code: 'JKT',
        name: 'Jackets',
        items: [
            'Bomber Jacket', 'Denim Jacket', 'Field Jacket', 'Windbreaker',
            'Harrington Jacket', 'Trucker Jacket', 'Coach Jacket', 'Utility Jacket'
        ],
        sizes: SIZES.menShirts,
        colors: COLORS.basic,
        basePrice: 75
    },
    {
        code: 'DRP',
        name: 'Dress Pants',
        items: [
            'Wool Dress Pants', 'Flat Front Dress Pants', 'Pleated Dress Pants',
            'Slim Fit Dress Pants', 'Classic Fit Dress Pants', 'Performance Dress Pants'
        ],
        sizes: SIZES.menPants,
        colors: ['Black', 'Navy', 'Charcoal', 'Gray', 'Tan'],
        basePrice: 55
    },
    {
        code: 'CHP',
        name: 'Chinos',
        items: [
            'Classic Chino', 'Slim Fit Chino', 'Straight Fit Chino', 'Athletic Fit Chino',
            'Stretch Chino', 'Utility Chino'
        ],
        sizes: SIZES.menPants,
        colors: COLORS.extended,
        basePrice: 42
    },
    {
        code: 'JNS',
        name: 'Jeans',
        items: [
            'Slim Jeans', 'Straight Jeans', 'Relaxed Jeans', 'Athletic Jeans',
            'Skinny Jeans', 'Boot Cut Jeans', 'Tapered Jeans'
        ],
        sizes: SIZES.menPants,
        colors: ['Dark Wash', 'Medium Wash', 'Light Wash', 'Black', 'Gray'],
        basePrice: 48
    },
    {
        code: 'SHT',
        name: 'Shorts',
        items: [
            'Chino Shorts', 'Cargo Shorts', 'Athletic Shorts', 'Swim Shorts',
            'Denim Shorts', 'Flat Front Shorts'
        ],
        sizes: ['30', '32', '34', '36', '38', '40'],
        colors: COLORS.extended,
        basePrice: 32
    }
];

// Generate Men's Clothing
menClothingSubcategories.forEach((subcat, subcatIndex) => {
    subcat.items.forEach((itemName, itemIndex) => {
        const skuNum = String(subcatIndex * 100 + itemIndex + 1).padStart(3, '0');
        const sku = `MC-${subcat.code}-${skuNum}`;
        const manufacturer = MANUFACTURERS.clothing[Math.floor(Math.random() * MANUFACTURERS.clothing.length)];

        INVENTORY_DATABASE.push(generateProduct({
            sku,
            name: itemName,
            category: "Men's Clothing",
            subcategory: subcat.name,
            gender: 'M',
            basePrice: subcat.basePrice,
            sizes: subcat.sizes,
            colors: subcat.colors,
            manufacturer
        }));
    });
});

// ===== WOMEN'S CLOTHING =====
const womenClothingSubcategories = [
    {
        code: 'BLS',
        name: 'Blouses',
        items: [
            'Silk Blouse', 'Chiffon Blouse', 'Button Down Blouse', 'Sleeveless Blouse',
            'Wrap Blouse', 'Peplum Blouse', 'Tie Neck Blouse', 'Ruffle Blouse'
        ],
        sizes: SIZES.womenShirts,
        colors: ['White', 'Black', 'Navy', 'Pink', 'Cream', 'Red'],
        basePrice: 38
    },
    {
        code: 'TEE',
        name: 'T-Shirts',
        items: [
            'Basic Crew Tee', 'V-Neck Tee', 'Scoop Neck Tee', 'Tank Top',
            'Long Sleeve Tee', 'Fitted Tee', 'Relaxed Tee', 'Crop Tee'
        ],
        sizes: SIZES.womenShirts,
        colors: COLORS.basic.concat(COLORS.bright),
        basePrice: 18
    },
    {
        code: 'SWT',
        name: 'Sweaters',
        items: [
            'Cashmere Sweater', 'Cardigan', 'Turtleneck', 'Pullover',
            'Wrap Sweater', 'Cowl Neck Sweater', 'Tunic Sweater'
        ],
        sizes: SIZES.womenShirts,
        colors: COLORS.extended.concat(['Burgundy', 'Mustard']),
        basePrice: 48
    },
    {
        code: 'JKT',
        name: 'Jackets',
        items: [
            'Blazer', 'Moto Jacket', 'Denim Jacket', 'Bomber Jacket',
            'Utility Jacket', 'Trench Coat', 'Pea Coat', 'Leather Jacket'
        ],
        sizes: SIZES.womenShirts,
        colors: ['Black', 'Navy', 'Tan', 'Gray', 'Burgundy'],
        basePrice: 72
    },
    {
        code: 'DRP',
        name: 'Dress Pants',
        items: [
            'Wide Leg Pants', 'Straight Leg Pants', 'Slim Pants', 'Ankle Pants',
            'Trouser Pants', 'Pleated Pants'
        ],
        sizes: SIZES.womenPants,
        colors: ['Black', 'Navy', 'Gray', 'Tan', 'White'],
        basePrice: 52
    },
    {
        code: 'CHP',
        name: 'Casual Pants',
        items: [
            'Chino Pants', 'Cargo Pants', 'Jogger Pants', 'Cropped Pants',
            'Pull-on Pants', 'Tapered Pants'
        ],
        sizes: SIZES.womenPants,
        colors: COLORS.extended,
        basePrice: 44
    },
    {
        code: 'JNS',
        name: 'Jeans',
        items: [
            'Skinny Jeans', 'Straight Jeans', 'Boyfriend Jeans', 'High Rise Jeans',
            'Mid Rise Jeans', 'Bootcut Jeans', 'Flare Jeans', 'Wide Leg Jeans'
        ],
        sizes: SIZES.womenPants,
        colors: ['Dark Wash', 'Medium Wash', 'Light Wash', 'Black', 'White'],
        basePrice: 52
    },
    {
        code: 'DRS',
        name: 'Dresses',
        items: [
            'Sheath Dress', 'Shift Dress', 'Wrap Dress', 'A-Line Dress',
            'Midi Dress', 'Maxi Dress', 'Shirt Dress', 'Fit & Flare Dress'
        ],
        sizes: SIZES.womenShirts,
        colors: ['Black', 'Navy', 'Red', 'Floral', 'Stripe', 'Polka Dot'],
        basePrice: 62
    },
    {
        code: 'SKT',
        name: 'Skirts',
        items: [
            'Pencil Skirt', 'A-Line Skirt', 'Midi Skirt', 'Mini Skirt',
            'Pleated Skirt', 'Wrap Skirt', 'Maxi Skirt'
        ],
        sizes: SIZES.womenPants,
        colors: ['Black', 'Navy', 'Gray', 'Tan', 'Print'],
        basePrice: 38
    },
    {
        code: 'SHT',
        name: 'Shorts',
        items: [
            'Chino Shorts', 'Denim Shorts', 'Athletic Shorts', 'Bermuda Shorts',
            'High Rise Shorts', 'Cargo Shorts'
        ],
        sizes: SIZES.womenPants,
        colors: COLORS.extended,
        basePrice: 34
    }
];

// Generate Women's Clothing
womenClothingSubcategories.forEach((subcat, subcatIndex) => {
    subcat.items.forEach((itemName, itemIndex) => {
        const skuNum = String(subcatIndex * 100 + itemIndex + 1).padStart(3, '0');
        const sku = `WC-${subcat.code}-${skuNum}`;
        const manufacturer = MANUFACTURERS.clothing[Math.floor(Math.random() * MANUFACTURERS.clothing.length)];

        INVENTORY_DATABASE.push(generateProduct({
            sku,
            name: itemName,
            category: "Women's Clothing",
            subcategory: subcat.name,
            gender: 'W',
            basePrice: subcat.basePrice,
            sizes: subcat.sizes,
            colors: subcat.colors,
            manufacturer
        }));
    });
});

// ===== MEN'S SHOES =====
const menShoesSubcategories = [
    {
        code: 'DRS',
        name: 'Dress Shoes',
        items: [
            'Oxford Shoe', 'Derby Shoe', 'Loafer', 'Monk Strap', 'Brogue',
            'Cap Toe Oxford', 'Wingtip', 'Venetian Loafer', 'Penny Loafer', 'Tassel Loafer'
        ],
        sizes: SIZES.shoes,
        colors: ['Black', 'Brown', 'Tan', 'Burgundy'],
        basePrice: 85
    },
    {
        code: 'CAS',
        name: 'Casual Shoes',
        items: [
            'Boat Shoe', 'Driving Moccasin', 'Slip-On', 'Canvas Shoe',
            'Chukka Boot', 'Desert Boot', 'Chelsea Boot'
        ],
        sizes: SIZES.shoes,
        colors: COLORS.extended,
        basePrice: 65
    },
    {
        code: 'SNK',
        name: 'Sneakers',
        items: [
            'Low Top Sneaker', 'High Top Sneaker', 'Running Shoe', 'Training Shoe',
            'Basketball Shoe', 'Skate Shoe', 'Retro Sneaker', 'Slip-On Sneaker'
        ],
        sizes: SIZES.shoes,
        colors: COLORS.basic.concat(['White/Navy', 'Black/White', 'Gray/Red']),
        basePrice: 72
    },
    {
        code: 'BOT',
        name: 'Boots',
        items: [
            'Work Boot', 'Chelsea Boot', 'Chukka Boot', 'Combat Boot',
            'Hiking Boot', 'Winter Boot', 'Engineer Boot'
        ],
        sizes: SIZES.shoes,
        colors: ['Black', 'Brown', 'Tan', 'Gray'],
        basePrice: 95
    },
    {
        code: 'SAN',
        name: 'Sandals',
        items: [
            'Slide Sandal', 'Sport Sandal', 'Flip Flop', 'Fisherman Sandal'
        ],
        sizes: SIZES.shoes,
        colors: ['Black', 'Brown', 'Navy', 'Gray'],
        basePrice: 35
    }
];

// Generate Men's Shoes
menShoesSubcategories.forEach((subcat, subcatIndex) => {
    subcat.items.forEach((itemName, itemIndex) => {
        const skuNum = String(subcatIndex * 100 + itemIndex + 1).padStart(3, '0');
        const sku = `MS-${subcat.code}-${skuNum}`;
        const manufacturer = MANUFACTURERS.shoes[Math.floor(Math.random() * MANUFACTURERS.shoes.length)];

        INVENTORY_DATABASE.push(generateProduct({
            sku,
            name: itemName,
            category: "Men's Shoes",
            subcategory: subcat.name,
            gender: 'M',
            basePrice: subcat.basePrice,
            sizes: subcat.sizes,
            colors: subcat.colors,
            manufacturer
        }));
    });
});

// ===== WOMEN'S SHOES =====
const womenShoesSubcategories = [
    {
        code: 'HEL',
        name: 'Heels',
        items: [
            'Pump', 'Stiletto', 'Kitten Heel', 'Block Heel', 'Wedge',
            'Platform Heel', 'Slingback', 'Peep Toe', 'Ankle Strap Heel'
        ],
        sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
        colors: ['Black', 'Nude', 'Red', 'Navy', 'Tan'],
        basePrice: 68
    },
    {
        code: 'FLT',
        name: 'Flats',
        items: [
            'Ballet Flat', 'Loafer', 'Pointed Flat', 'Round Toe Flat',
            'Mule', 'Driving Flat', 'Oxford Flat', 'Slip-On Flat'
        ],
        sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
        colors: COLORS.extended,
        basePrice: 52
    },
    {
        code: 'SNK',
        name: 'Sneakers',
        items: [
            'Fashion Sneaker', 'Running Shoe', 'Slip-On Sneaker', 'High Top',
            'Platform Sneaker', 'Athletic Shoe', 'Walking Shoe'
        ],
        sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
        colors: ['White', 'Black', 'Gray', 'Pink', 'Navy'],
        basePrice: 65
    },
    {
        code: 'BOT',
        name: 'Boots',
        items: [
            'Ankle Boot', 'Knee High Boot', 'Chelsea Boot', 'Combat Boot',
            'Riding Boot', 'Western Boot', 'Over-the-Knee Boot', 'Bootie'
        ],
        sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
        colors: ['Black', 'Brown', 'Tan', 'Burgundy', 'Gray'],
        basePrice: 88
    },
    {
        code: 'SAN',
        name: 'Sandals',
        items: [
            'Flat Sandal', 'Wedge Sandal', 'Slide Sandal', 'Gladiator Sandal',
            'Sport Sandal', 'Flip Flop', 'Espadrille'
        ],
        sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
        colors: ['Black', 'Tan', 'White', 'Brown', 'Silver'],
        basePrice: 42
    }
];

// Generate Women's Shoes
womenShoesSubcategories.forEach((subcat, subcatIndex) => {
    subcat.items.forEach((itemName, itemIndex) => {
        const skuNum = String(subcatIndex * 100 + itemIndex + 1).padStart(3, '0');
        const sku = `WS-${subcat.code}-${skuNum}`;
        const manufacturer = MANUFACTURERS.shoes[Math.floor(Math.random() * MANUFACTURERS.shoes.length)];

        INVENTORY_DATABASE.push(generateProduct({
            sku,
            name: itemName,
            category: "Women's Shoes",
            subcategory: subcat.name,
            gender: 'W',
            basePrice: subcat.basePrice,
            sizes: subcat.sizes,
            colors: subcat.colors,
            manufacturer
        }));
    });
});

// ===== ACCESSORIES =====
const accessoriesSubcategories = [
    {
        code: 'BLT',
        name: 'Belts',
        items: [
            'Leather Belt', 'Canvas Belt', 'Braided Belt', 'Reversible Belt',
            'Dress Belt', 'Casual Belt', 'Web Belt', 'Stretch Belt'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Brown', 'Tan', 'Navy'],
        basePrice: 25,
        gender: 'U'
    },
    {
        code: 'BAG',
        name: 'Bags',
        items: [
            'Backpack', 'Messenger Bag', 'Tote Bag', 'Duffle Bag',
            'Crossbody Bag', 'Shoulder Bag', 'Clutch', 'Satchel',
            'Weekender Bag', 'Laptop Bag'
        ],
        sizes: SIZES.oneSize,
        colors: ['Black', 'Brown', 'Navy', 'Gray', 'Tan'],
        basePrice: 55,
        gender: 'U'
    },
    {
        code: 'WAL',
        name: 'Wallets',
        items: [
            'Bifold Wallet', 'Trifold Wallet', 'Card Holder', 'Money Clip',
            'Zip Wallet', 'Travel Wallet', 'Coin Purse'
        ],
        sizes: SIZES.oneSize,
        colors: ['Black', 'Brown', 'Tan', 'Navy'],
        basePrice: 32,
        gender: 'U'
    },
    {
        code: 'HAT',
        name: 'Hats',
        items: [
            'Baseball Cap', 'Beanie', 'Fedora', 'Bucket Hat',
            'Trucker Hat', 'Snapback', 'Dad Hat', 'Winter Hat'
        ],
        sizes: SIZES.oneSize,
        colors: ['Black', 'Navy', 'Gray', 'Tan', 'Red'],
        basePrice: 22,
        gender: 'U'
    },
    {
        code: 'SCF',
        name: 'Scarves',
        items: [
            'Wool Scarf', 'Cashmere Scarf', 'Infinity Scarf', 'Silk Scarf',
            'Cotton Scarf', 'Knit Scarf'
        ],
        sizes: SIZES.oneSize,
        colors: ['Black', 'Navy', 'Gray', 'Red', 'Burgundy'],
        basePrice: 28,
        gender: 'U'
    },
    {
        code: 'GLV',
        name: 'Gloves',
        items: [
            'Leather Gloves', 'Knit Gloves', 'Wool Gloves', 'Touchscreen Gloves',
            'Driving Gloves', 'Winter Gloves'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Brown', 'Gray', 'Navy'],
        basePrice: 24,
        gender: 'U'
    },
    {
        code: 'SUN',
        name: 'Sunglasses',
        items: [
            'Aviator Sunglasses', 'Wayfarer Sunglasses', 'Round Sunglasses', 'Cat Eye Sunglasses',
            'Sport Sunglasses', 'Oversized Sunglasses', 'Square Sunglasses'
        ],
        sizes: SIZES.oneSize,
        colors: ['Black', 'Tortoise', 'Gold', 'Silver'],
        basePrice: 45,
        gender: 'U'
    },
    {
        code: 'WTH',
        name: 'Watches',
        items: [
            'Analog Watch', 'Digital Watch', 'Chronograph', 'Dress Watch',
            'Sport Watch', 'Dive Watch', 'Smart Watch'
        ],
        sizes: SIZES.oneSize,
        colors: ['Silver', 'Gold', 'Black', 'Rose Gold'],
        basePrice: 95,
        gender: 'U'
    },
    {
        code: 'JWL',
        name: 'Jewelry',
        items: [
            'Necklace', 'Bracelet', 'Earrings', 'Ring',
            'Pendant', 'Cufflinks', 'Tie Clip', 'Brooch'
        ],
        sizes: SIZES.oneSize,
        colors: ['Silver', 'Gold', 'Rose Gold'],
        basePrice: 38,
        gender: 'U'
    },
    {
        code: 'TIE',
        name: 'Ties & Bow Ties',
        items: [
            'Silk Tie', 'Skinny Tie', 'Bow Tie', 'Knit Tie',
            'Striped Tie', 'Solid Tie', 'Patterned Tie'
        ],
        sizes: SIZES.oneSize,
        colors: ['Navy', 'Black', 'Red', 'Burgundy', 'Gray'],
        basePrice: 28,
        gender: 'M'
    }
];

// Generate Accessories
accessoriesSubcategories.forEach((subcat, subcatIndex) => {
    subcat.items.forEach((itemName, itemIndex) => {
        const skuNum = String(subcatIndex * 100 + itemIndex + 1).padStart(3, '0');
        const sku = `AC-${subcat.code}-${skuNum}`;
        const manufacturer = MANUFACTURERS.accessories[Math.floor(Math.random() * MANUFACTURERS.accessories.length)];

        INVENTORY_DATABASE.push(generateProduct({
            sku,
            name: itemName,
            category: "Accessories",
            subcategory: subcat.name,
            gender: subcat.gender,
            basePrice: subcat.basePrice,
            sizes: subcat.sizes,
            colors: subcat.colors,
            manufacturer
        }));
    });
});

// Export for use in app
console.log(`Generated ${INVENTORY_DATABASE.length} SKUs`);
