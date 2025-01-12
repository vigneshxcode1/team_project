import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Usermodel from '../Model/User.js'

export const register = async (req, res) => {

    const { name, email, password,bio, subject, studystyle, location } = req.body;

    try {
        const existinguser = await Usermodel.findOne({ email });
        if (existinguser) {
            return res.status(200).json({
                success: "true",
                message: "user already exist"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = new Usermodel({
            name, password:hashpassword, email,bio, subject, studystyle, location
        })

        await user.save()
        res.status(200).json({
            user,
            message:"success register"
    })
    } catch (err) {
        console.log(err)
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(200).json({
                success: "true",
                message: "user not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "invalid credential"
            })
        }

        const token = jwt.sign({ id: user._id }, "vigneshwaran", { expiresIn: "7d" });

        res.status(200).json({
            user,
            token,
            message:"success login"
    })

    } catch (err) {
        console.log(err)
    }
}


export const updateprofile = async (req, res) => {
   
        const { name, subjects, studyStyles, location } = req.body;
      
        try {
          const user = await Usermodel.findByIdAndUpdate(
            req.user.id,
            { name, subjects, studyStyles, location },
            { new: true }
          );
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
  };
  