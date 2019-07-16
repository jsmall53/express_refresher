import user_controller from './users.controller';
export default user_controller;
// import express from 'express';

// import { validateAccessToken } from '../../middleware';
// import { 
//     findUserByEmail,
//     signupUser,
//     loginUser,
//     generateAccessToken,
//     returnUser,
// } from './service';

// export default function() {
//     const router = express.Router();

//     router.post('/signup',
//         findUserByEmail,
//         signupUser,
//         generateAccessToken,
//         returnUser
//     );

//     router.post('/login',
//         findUserByEmail,
//         loginUser,
//         generateAccessToken,
//         returnUser,
//     );

//     router.get('/me',
//         validateAccessToken,
//         findUserByEmail,
//         returnUser,
//     );

//     return router;
// }