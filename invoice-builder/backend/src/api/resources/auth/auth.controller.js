import jwt from 'jsonwebtoken';
import { devConfig } from '../../../config/env/development';

export default {
  sendJWTToken(req, res) {
    const token = jwt.sign({ id: req.currentUser._id }, devConfig.secret, {
      expiresIn: '1d',
    });
    res.redirect(`${devConfig.frontendURL}/dashboard/invoices/?token=${token}`);
  },
  authenticate(req, res) {
    return res.send(true);
  },
  logout(req, res) {
    req.logout(); // remove the session and remove req.currentUser;
    return res.json({ success: true });
  },
};
