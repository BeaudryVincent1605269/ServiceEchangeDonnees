import './env.js';
import chalk from 'chalk';

import app from './src/app.js';

console.log(chalk.blue('Bonjour'));

const PORT = process.env.PORT;

app.listen(PORT, err => {
    console.log(chalk.greenBright(`Server listening on port: ${PORT}`));
});