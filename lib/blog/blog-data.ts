import { BlogI } from "../types/blog";
import fs from 'fs';
import path from 'path';

export const blogData: BlogI[] = [
    {
        id: "1",
        slug: 'how-you-can-automate-your-hiring-process-with-ai',
        title: 'How you can automate your hiring process with AI',
        file: 'blog-1.md',
        author: "Dikshant Dave",
        description: 'Discover the power of AI and automation in recruitment with NoHR.ai. Streamline your hiring process, save time, and improve candidate experience. Automate interview scheduling using WhatsApp, reducing administrative tasks and increasing efficiency. Revolutionize your recruitment process with NoHR.ai.',
        published_at: "June 7, 2023 11:14 AM",
        cover_image: 'blog_1_image.jpg'

    }
]



export const getMarkdownDataForBlog: (file_name: string) => string = (file_name) => {
    // Define the path to the file
    const filePath = path.join('markdown_files', 'blog', file_name);

    // Read the file's content
    const fileContent = fs.readFileSync(filePath, 'utf8');


    return fileContent;
}
