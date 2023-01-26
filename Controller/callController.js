const { uuid } = require('uuidv4');
const nodemailer = require("nodemailer");

const callHandler = async (req, res) => {
  try {
    let id = uuid();
    let cid = uuid();
    let link = `http://localhost:3000/connect?appid=29e55ef2413b499287a93d636bfe9979&channel=${id}&&uid=${cid}`;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.email, // generated ethereal user
        pass: process.env.pass,
      },
    });
    // send mail with defined transport object
    let info = transporter
      .sendMail({
        from: process.env.email, // sender address
        to: req.body.list, // list of receivers
        subject: "Call Over HelloSign", // Subject line
        html: `Link- ${link} <br> <i>Team HelloSign</i>`,
        // plain text body
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json({
      id,
      link,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Faild to make call",
    });
  }
};



module.exports.callHandler = callHandler;