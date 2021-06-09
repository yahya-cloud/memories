import Mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts =  async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
       
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
   const post = req.body;
   const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try {
      await newPost.save();
      res.status(201).json(newPost);
   } catch (error) {
       res.status(401).json({err: error })
   }
}

export const updatePost = async (req, res) => {
    const {id: id} = req.params;
    const post = req.body;

    if(!Mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);
    
}

export const deletePost = async (req, res) => {
    const {id: id} = req.params;

    if(!Mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    }

    await PostMessage.findByIdAndDelete(id);
    res.json({message: "Post deleted Successfully"})
}

export const likePost = async (req, res) => {
    const {id: id} = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated'});

    if(!Mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    }

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex(_id => _id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else {
        post.likes = post.likes.filter(_id => _id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);

}