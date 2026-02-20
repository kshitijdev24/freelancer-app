import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Gig from './models/Gig.js';
import Job from './models/Job.js';
import Message from './models/Message.js';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');
        // Clear existing data
        await User.deleteMany({});
        await Gig.deleteMany({});
        await Job.deleteMany({});
        await Message.deleteMany({});
        console.log('Existing data cleared.');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        // --- DEMO USERS ---
        const users = [
            { username: 'Alex Rivera', email: 'alex@dev.com', password: hashedPassword, role: 'freelancer', description: 'Fullstack developer specialized in high-performance Web-3 protocols.', skills: ['Next.js', 'Rust', 'Solidity'] },
            { username: 'Elena Vance', email: 'elena@creative.com', password: hashedPassword, role: 'freelancer', description: 'Visual systems architect focusing on minimalist cyberpunk aesthetics.', skills: ['Figma', 'Blender', 'Photoshop'] },
            { username: 'Marcus Thorne', email: 'marcus@ai.com', password: hashedPassword, role: 'freelancer', description: 'ML engineer obsessed with neural network efficiency and vector databases.', skills: ['PyTorch', 'Python', 'LLMs'] },
            { username: 'Sasha Grey', email: 'sasha@video.com', password: hashedPassword, role: 'freelancer', description: 'Multimedia operator specialized in dynamic motion graphics and VFX.', skills: ['After Effects', 'Premiere', 'Davinci'] },
            { username: 'OmniCorp', email: 'ops@omnicorp.com', password: hashedPassword, role: 'client', description: 'Global infrastructure conglomerate seeking specialized node operators.' },
            { username: 'Cyberia Hub', email: 'contact@cyberia.io', password: hashedPassword, role: 'client', description: 'Next-gen incubator for autonomous decentralized projects.' },
        ];
        const createdUsers = await User.insertMany(users);
        console.log('Demo users created.');
        const alex = createdUsers[0];
        const elena = createdUsers[1];
        const marcus = createdUsers[2];
        const sasha = createdUsers[3];
        const omnicorp = createdUsers[4];
        const cyberia = createdUsers[5];
        // --- DEMO GIGS ---
        const gigs = [
            // Web Dev
            { owner: alex._id, title: 'Build High-Performance React Dashboard', description: 'Deploying a localized React workspace with real-time metrics and AES-256 state management.', category: 'Web Development', price: 1200, deliveryTime: 7, rating: 4.9, reviewsCount: 28 },
            { owner: alex._id, title: 'Smart Contract Protocol Deployment', description: 'Full audit and deployment of ERC-721 protocols on EVM-compatible networks.', category: 'Web Development', price: 2500, deliveryTime: 14, rating: 5.0, reviewsCount: 12 },
            // Graphic Design
            { owner: elena._id, title: 'Minimalist Cyberpunk Brand Identity', description: 'Creating a unified visual protocol for your digital presence. Includes vectors and style guide.', category: 'Graphic Design', price: 800, deliveryTime: 5, rating: 4.8, reviewsCount: 45 },
            { owner: elena._id, title: '3D Product Visualization & VFX', description: 'High-fidelity renders of hardware nodes for marketing integration.', category: 'Graphic Design', price: 1500, deliveryTime: 10, rating: 4.9, reviewsCount: 19 },
            // AI Services
            { owner: marcus._id, title: 'Fine-tune Llama-3 for Niche Protocols', description: 'Optimizing open-source LLMs on specialized datasets for automated documentation execution.', category: 'AI Services', price: 3000, deliveryTime: 21, rating: 5.0, reviewsCount: 8 },
            { owner: marcus._id, title: 'Neural Vector Database Implementation', description: 'Integrating Pinecone or Milvus into existing data pipelines for semantic search capability.', category: 'AI Services', price: 1800, deliveryTime: 12, rating: 4.7, reviewsCount: 15 },
            // Video Editing
            { owner: sasha._id, title: 'High-Stakes Cinematic Product Launch', description: '4K motion graphics and sound design for tech product disclosures.', category: 'Video Editing', price: 2000, deliveryTime: 15, rating: 5.0, reviewsCount: 22 },
        ];
        await Gig.insertMany(gigs);
        console.log('Demo gigs created.');
        // --- DEMO JOBS ---
        const jobs = [
            { client: omnicorp._id, title: 'Urgent: Node Infrastructure Failure Rescue', description: 'Internal dashboard systems showing signal loss. Requesting immediate React/Node expertise to stabilize.', category: 'Web Development', budget: 5000, status: 'open' },
            { client: cyberia._id, title: 'Autonomous Agent Design for Discord', description: 'Requirement for a Python specialized agent to manage decentralized community governance.', category: 'AI Services', budget: 3500, status: 'open' },
            { client: omnicorp._id, title: 'Protocol Documentation Visualization', description: 'Need 15 high-quality infographics for a technical whitepaper disclosure.', category: 'Graphic Design', budget: 1500, status: 'open' },
        ];
        await Job.insertMany(jobs);
        console.log('Demo jobs created.');
        // --- DEMO CONVERSATIONS ---
        const messages = [
            { sender: omnicorp._id, receiver: alex._id, text: 'Operator Alex, we have an emergency in Sector 7. Can you sync now?' },
            { sender: alex._id, receiver: omnicorp._id, text: 'Receiving signal, OmniCorp. Initializing diagnostic protocol. Standby.' },
            { sender: omnicorp._id, receiver: alex._id, text: 'The React workspace is losing state intermittently. We suspect a race condition in the auth middleware.' },
            { sender: alex._id, receiver: omnicorp._id, text: 'Understood. Is the AES-256 layer active? I am seeing high latency on the secondary node.' },
            { sender: cyberia._id, receiver: marcus._id, text: 'We liked your portfolio. Are you available for a multi-node implementation?' },
            { sender: marcus._id, receiver: cyberia._id, text: 'Always available for high-complexity neural tasks. What is the scope?' },
            { sender: cyberia._id, receiver: marcus._id, text: 'We need to fine-tune a model for autonomous community moderation. Expecting 10k concurrent signals.' },
            { sender: cyberia._id, receiver: elena._id, text: 'Elena, we need a minimalist logo for our new DAO. Needs to feel high-fidelity and decentralized.' },
        ];
        await Message.insertMany(messages);
        console.log('Demo messages created.');
        console.log('Database seeding completed successfully!');
        process.exit();
    }
    catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};
seedData();
//# sourceMappingURL=seed.js.map