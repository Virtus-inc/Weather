const PDFParser = require("pdf-parse");
const User = require('../models/user');
const File = require('../models/file');

exports.uploadFile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const data = req.file;

    const decodedName = Buffer.from(req.file.originalname, 'latin1').toString('utf8'); // Fix Mangled Cyrillic

    if (!data) {
      return res.status(400).send('No file uploaded.');
    }

    const pdfData = await PDFParser(data.buffer);

    const file = await File.create({
      name: decodedName,
      pages: pdfData.numpages,
      size: data.size,
      data: data.buffer,
      ownerId: userId,
      contentType: data.mimetype
    });

    if (!file) {
      return res.status(404).send('File not found.');
    }

    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
};

exports.getFiles = async (req, res) => {
  res.json({ files: await File.find({ ownerId: req.session.userId }) || null, user: await User.findById(req.session.userId) || null });
}