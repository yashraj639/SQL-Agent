import { db } from "./index";
import { productsTable, salesTable } from "./schema";

async function seed() {
    try {
        console.log("Starting database seeding...");

        await db.insert(productsTable).values([
            // Electronics
            {
                name: "Laptop Pro 15",
                price: 1299.99,
                description: "High-performance laptop with 16GB RAM and 512GB SSD",
                stock: 45,
                category: "Electronics",
            },
            {
                name: "Wireless Mouse",
                price: 29.99,
                description: "Ergonomic wireless mouse with precision tracking",
                stock: 150,
                category: "Electronics",
            },
            {
                name: "USB-C Hub",
                price: 49.99,
                description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
                stock: 80,
                category: "Electronics",
            },
            {
                name: "Mechanical Keyboard",
                price: 89.99,
                description: "RGB mechanical keyboard with blue switches",
                stock: 60,
                category: "Electronics",
            },
            {
                name: "4K Monitor 27\"",
                price: 399.99,
                description: "27-inch 4K UHD monitor with HDR support",
                stock: 30,
                category: "Electronics",
            },

            // Clothing
            {
                name: "Cotton T-Shirt",
                price: 19.99,
                description: "100% organic cotton t-shirt, available in multiple colors",
                stock: 200,
                category: "Clothing",
            },
            {
                name: "Denim Jeans",
                price: 59.99,
                description: "Classic fit denim jeans with stretch comfort",
                stock: 120,
                category: "Clothing",
            },
            {
                name: "Winter Jacket",
                price: 129.99,
                description: "Waterproof winter jacket with thermal insulation",
                stock: 75,
                category: "Clothing",
            },
            {
                name: "Running Shoes",
                price: 79.99,
                description: "Lightweight running shoes with cushioned sole",
                stock: 95,
                category: "Clothing",
            },
            {
                name: "Baseball Cap",
                price: 24.99,
                description: "Adjustable baseball cap with embroidered logo",
                stock: 180,
                category: "Clothing",
            },

            // Home & Garden
            {
                name: "Coffee Maker",
                price: 89.99,
                description: "Programmable coffee maker with thermal carafe",
                stock: 55,
                category: "Home & Garden",
            },
            {
                name: "Blender",
                price: 69.99,
                description: "High-speed blender with multiple settings",
                stock: 70,
                category: "Home & Garden",
            },
            {
                name: "Garden Tool Set",
                price: 45.99,
                description: "5-piece garden tool set with carrying case",
                stock: 40,
                category: "Home & Garden",
            },
            {
                name: "LED Desk Lamp",
                price: 34.99,
                description: "Adjustable LED desk lamp with USB charging port",
                stock: 110,
                category: "Home & Garden",
            },
            {
                name: "Vacuum Cleaner",
                price: 199.99,
                description: "Cordless vacuum cleaner with HEPA filter",
                stock: 35,
                category: "Home & Garden",
            },

            // Books
            {
                name: "The Art of Programming",
                price: 39.99,
                description: "Comprehensive guide to modern programming practices",
                stock: 85,
                category: "Books",
            },
            {
                name: "Mystery Novel Collection",
                price: 24.99,
                description: "Collection of bestselling mystery novels",
                stock: 100,
                category: "Books",
            },
            {
                name: "Cooking Masterclass",
                price: 29.99,
                description: "Professional cooking techniques and recipes",
                stock: 65,
                category: "Books",
            },
            {
                name: "Fitness Guide",
                price: 19.99,
                description: "Complete guide to fitness and nutrition",
                stock: 90,
                category: "Books",
            },
            {
                name: "Photography Basics",
                price: 34.99,
                description: "Learn photography from beginner to advanced",
                stock: 55,
                category: "Books",
            },
        ]);

        await db.insert(salesTable).values([
            {
                productId: 1,
                quantity: 1,
                totalAmount: 1299.99,
                region: "North America",
                salesDate: "2022-01-01",
                customerName: "John Smith"
            },
            {
                productId: 2,
                quantity: 2,
                totalAmount: 59.98,
                region: "Europe",
                salesDate: "2022-01-02",
                customerName: "Emma Johnson"
            },
            {
                productId: 3,
                quantity: 3,
                totalAmount: 149.97,
                region: "Asia",
                salesDate: "2022-01-03",
                customerName: "Michael Brown"
            },
            {
                productId: 4,
                quantity: 4,
                totalAmount: 359.96,
                region: "South America",
                salesDate: "2022-01-04",
                customerName: "Sophia Davis"
            },
            {
                productId: 5,
                quantity: 5,
                totalAmount: 1999.95,
                region: "Australia",
                salesDate: "2022-01-05",
                customerName: "James Wilson"
            },
            {
                productId: 6,
                quantity: 1,
                totalAmount: 1299.99,
                region: "North America",
                salesDate: "2022-01-01",
                customerName: "John Smith"
            },
            {
                productId: 7,
                quantity: 2,
                totalAmount: 59.98,
                region: "Europe",
                salesDate: "2022-01-02",
                customerName: "Emma Johnson"
            },
            {
                productId: 8,
                quantity: 3,
                totalAmount: 149.97,
                region: "Asia",
                salesDate: "2022-01-03",
                customerName: "Michael Brown"
            },
            {
                productId: 9,
                quantity: 4,
                totalAmount: 359.96,
                region: "South America",
                salesDate: "2022-01-04",
                customerName: "Sophia Davis"
            },
            {
                productId: 10,
                quantity: 5,
                totalAmount: 1999.95,
                region: "Australia",
                salesDate: "2022-01-05",
                customerName: "James Wilson"
            },
        ])

    } catch (error) {
        console.error(" Error seeding database:", error);
        throw error;
    }
}

seed()
    .then(() => {
        console.log("Seed script finished");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Seed script failed:", error);
        process.exit(1);
    });
