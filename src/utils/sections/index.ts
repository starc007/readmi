export const sections = [
  {
    id: 1,
    name: "Title and Description",
    md: `
# <p align="center">Title</p>
  
Your description here
    `,
  },
  {
    id: 2,
    name: "Add Image",
    md: `
![Image](https://i.imgur.com/0Z0Z0Z0.png)
        `,
  },
  {
    id: 3,
    name: "Add Link",
    md: `
[Link](https://www.google.com)
        `,
  },
  {
    id: 4,
    name: "Add Table",
    md: `
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |
| Row 3    | Row 3    | Row 3    |
        `,
  },
  {
    id: 5,
    name: "Install Dependencies",
    md: `
\`\`\`bash
npm install
\`\`\`
        `,
  },
  {
    id: 6,
    name: "Features",
    md: `
## ➤ Features    
- Feature 1
- Feature 2
- Feature 3
        `,
  },
  {
    id: 7,
    name: "Usage",
    md: `
\`\`\`js
## ➤ Usage
import { useMetamask } from '@saura3h/web3-connect'
const client = new useMetamask()
const connectWallet = async () => {
    const wallet = await client.__connectMM()
    console.log(wallet)
}
\`\`\`
        `,
  },
  {
    id: 8,
    name: "API Reference 1",
    md: `
## ➤ API Reference

### Submit form
\`\`\`http
POST /api/form
\`\`\`
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`name\`   | \`string\` | **Required**. Your name    |
| \`email\`  | \`string\` | **Required**. Your email   |
| \`message\`| \`string\` | **Required**. Your message |


`,
  },
  {
    id: 9,
    name: "API Reference 2",
    md: `
## ➤ API Reference 2

### Get all users
\`\`\`http
GET /api/users
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`token\` | \`string\` | **Required**. Your auth token |

### Get user by id
\`\`\`http
GET /api/users/:userId
\`\`\`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| \`userId\` | \`string\` | **Required**. Your user id |
        `,
  },

  {
    id: 10,
    name: "Acknowledgements",
    md: `
## ➤ Acknowledgements      
- [Awesome README]()
- [GitHub Emoji Cheat Sheet]()
- [GitHub Markdown Emoji]()
        `,
  },
  {
    id: 11,
    name: "Contributing",
    md: `
## ➤ Contributing    
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md) & [contributing guidelines](CONTRIBUTING.md).
        `,
  },
  {
    id: 12,
    name: "Support",
    md: `
## Support ❤️ 
A simple star to this project repo is enough to keep me motivated on this project for days. If you find your self very much excited with this project let me know with a tweet.

If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/saurra3h).
        `,
  },
  {
    id: 13,
    name: "License",
    md: `
## ➤ License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
        `,
  },
  {
    id: 14,
    name: "Author",
    md: `
## ➤ Author
#### Saurabh Chauhan
- Twitter: [@saurra3h](https://twitter.com/saurra3h)
- Github: [@starc007](https://github.com/starc007)
        `,
  },
  {
    id: 15,
    name: "Tech Stack",
    md: `
## ➤ Tech Stack
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
    `,
  },
];
