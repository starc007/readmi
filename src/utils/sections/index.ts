export const sections = [
  {
    name: "Title and Description",
    slug: "title-description",
    isSelected: true,
    md: `
# <p align="center">Title</p>
  
Your description here
    `,
  },
  {
    name: "Features",
    slug: "features",
    isSelected: false,
    md: `
## 🧐 Features    
- Feature 1
- Feature 2
- Feature 3
        `,
  },
  {
    name: "Tech Stack",
    slug: "tech-stack",
    isSelected: false,
    md: `
## 🛠️ Tech Stack
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
    `,
  },
  {
    name: "Installation",
    slug: "installation",
    isSelected: false,
    md: `
## 🛠️ Install Dependencies    
\`\`\`bash
npm install package-name
\`\`\`
        `,
  },
  {
    name: "Add Image",
    slug: "image",
    isSelected: false,
    md: `
![Image](https://i.imgur.com/0Z0Z0Z0.png)
        `,
  },
  {
    name: "Add Link",
    slug: "link",
    isSelected: false,
    md: `
[Link](https://www.google.com)
        `,
  },
  {
    name: "Add Table",
    slug: "table",
    isSelected: false,
    md: `
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |
| Row 3    | Row 3    | Row 3    |
        `,
  },

  {
    name: "Usage",
    slug: "usage",
    isSelected: false,
    md: `
## 🧑🏻‍💻 Usage
\`\`\`js
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
    name: "API Reference POST",
    slug: "api-reference-post",
    isSelected: false,
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
    name: "API Reference GET",
    slug: "api-reference-get",
    isSelected: false,
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
    name: "Acknowledgements",
    slug: "acknowledgements",
    isSelected: false,
    md: `
## 🙇 Acknowledgements      
- [Awesome README]()
- [GitHub Emoji Cheat Sheet]()
- [GitHub Markdown Emoji]()
        `,
  },
  {
    name: "Contributing",
    slug: "contributing",
    isSelected: false,
    md: `
## 🍰 Contributing    
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Before contributing, please read the [code of conduct](CODE_OF_CONDUCT.md) & [contributing guidelines](CONTRIBUTING.md).
        `,
  },
  {
    name: "Support",
    slug: "support",
    isSelected: false,
    md: `
## ❤️ Support  
A simple star to this project repo is enough to keep me motivated on this project for days. If you find your self very much excited with this project let me know with a tweet.

If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/saurra3h).
        `,
  },
  {
    name: "Author",
    slug: "author",
    isSelected: false,
    md: `
## 🙇 Author
#### Saurabh Chauhan
- Twitter: [@saurra3h](https://twitter.com/saurra3h)
- Github: [@starc007](https://github.com/starc007)
        `,
  },
  {
    name: "License",
    slug: "license",
    isSelected: false,
    md: `
## ➤ License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
        `,
  },
];
