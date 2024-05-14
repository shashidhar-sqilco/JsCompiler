const express = require('express');
const cors=require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())
// Route to handle code execution
app.post('/execute', (req, res) => {
  const code = req.body.code;

  // Generate a unique filename for the code
  const filename = `output_${Date.now()}.js`;
  const outputPath = `./outputs/${filename}`;

  // Write the code to a file
  fs.writeFile(outputPath, code, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to write file' });
    }

    // Execute the code and capture the output
    const child = require('child_process').spawn('node', [outputPath]);
    let output = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      output += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) {
        res.json({ output });
      } else {
        res.status(500).json({ error: 'Code execution failed' });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});