// Import required modules
const express = require('express');
const admin = require('firebase-admin');  // Firebase Admin SDK
const multer = require('multer');         // Middleware to handle file uploads
const path = require('path');             // To manage file paths

// Initialize Express
const app = express();

// Parse JSON requests
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp();

// Access Firestore
const db = admin.firestore();

// Set up multer for file uploads
const storage = multer.memoryStorage();  // Store files in memory temporarily
const upload = multer({ storage: storage });

// Add a new clipboard item to Firestore
app.post('/api/entries', upload.single('image'), (req, res) => {
    const { content } = req.body; // Content from the form
    const { file } = req;          // File (if uploaded)

    // Handle image upload logic (Optional: Save to Firebase Storage or local storage)
    let imageUrl = null;

    if (file) {
        // For now, we'll simply log the image, you can upload it to Firebase Storage later
        imageUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    }

    const newClip = {
        content: content,  // Content from the request body
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        image: imageUrl,    // Store image URL (if uploaded)
        type: 'text',       // Default type is 'text'
    };

    // Save the new clipboard item to Firestore
    db.collection('clips').add(newClip)
        .then(docRef => {
            res.status(200).send({ message: 'Clip added successfully', id: docRef.id });
        })
        .catch(error => {
            res.status(500).send({ message: 'Error adding clip', error: error.message });
        });
});

// Get all clipboard items
app.get('/api/entries', (req, res) => {
    db.collection('clips').get()
        .then(snapshot => {
            const clips = [];
            snapshot.forEach(doc => {
                clips.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).json(clips);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error getting clips', error: error.message });
        });
});

// Update a clipboard item by ID
app.put('/api/entries/:id', (req, res) => {
    const clipId = req.params.id;
    const updatedClip = {
        content: req.body.content,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        type: 'text',
    };

    db.collection('clips').doc(clipId).update(updatedClip)
        .then(() => {
            res.status(200).send({ message: 'Clip updated successfully' });
        })
        .catch(error => {
            res.status(500).send({ message: 'Error updating clip', error: error.message });
        });
});

// Delete a clipboard item by ID
app.delete('/api/entries/:id', (req, res) => {
    const clipId = req.params.id;

    db.collection('clips').doc(clipId).delete()
        .then(() => {
            res.status(200).send({ message: 'Clip deleted successfully' });
        })
        .catch(error => {
            res.status(500).send({ message: 'Error deleting clip', error: error.message });
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
