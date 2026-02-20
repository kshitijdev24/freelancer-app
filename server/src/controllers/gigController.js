import Gig from '../models/Gig.js';
export const createGig = async (req, res) => {
    try {
        const { title, description, category, price, deliveryTime, images } = req.body;
        const gig = await Gig.create({
            title,
            description,
            category,
            price,
            deliveryTime,
            images,
            owner: req.user.id,
        });
        res.status(201).json(gig);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getGigs = async (req, res) => {
    try {
        const { search, category, min, max, sort, owner } = req.query;
        const query = {};
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (owner) {
            query.owner = owner;
        }
        if (min || max) {
            query.price = {};
            if (min)
                query.price.$gte = Number(min);
            if (max)
                query.price.$lte = Number(max);
        }
        let gigsQuery = Gig.find(query).populate('owner', 'username profileImage');
        if (sort) {
            if (sort === 'price_asc')
                gigsQuery = gigsQuery.sort({ price: 1 });
            if (sort === 'price_desc')
                gigsQuery = gigsQuery.sort({ price: -1 });
            if (sort === 'newest')
                gigsQuery = gigsQuery.sort({ createdAt: -1 });
        }
        const gigs = await gigsQuery;
        res.json(gigs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id).populate('owner', 'username profileImage description');
        if (gig) {
            res.json(gig);
        }
        else {
            res.status(404).json({ message: 'Gig not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (gig) {
            if (gig.owner.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized to update this gig' });
            }
            gig.title = req.body.title || gig.title;
            gig.description = req.body.description || gig.description;
            gig.category = req.body.category || gig.category;
            gig.price = req.body.price || gig.price;
            gig.deliveryTime = req.body.deliveryTime || gig.deliveryTime;
            gig.images = req.body.images || gig.images;
            const updatedGig = await gig.save();
            res.json(updatedGig);
        }
        else {
            res.status(404).json({ message: 'Gig not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const deleteGig = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (gig) {
            if (gig.owner.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized to delete this gig' });
            }
            await gig.deleteOne();
            res.json({ message: 'Gig removed' });
        }
        else {
            res.status(404).json({ message: 'Gig not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=gigController.js.map