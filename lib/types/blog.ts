interface User {
    object: string;
    id: string;
  }
  
  interface File {
    url: string;
    expiry_time: string;
  }
  
  interface Cover {
    type: string;
    file: File;
  }
  
  interface CreatedTimeProperty {
    id: string;
    type: string;
    created_time: string;
  }
  
  interface FormulaProperty {
    id: string;
    type: string;
    formula: {
      type: string;
      string: string;
    };
  }
  
  interface MultiSelectProperty {
    id: string;
    type: string;
    multi_select: string[];
  }
  
  interface TextContent {
    content: string;
    link: {
      url: string;
    } | null;
  }
  
  interface Annotations {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  }
  
  interface RichText {
    type: string;
    text: TextContent;
    annotations: Annotations;
    plain_text: string;
    href: string | null;
  }
  
  interface RichTextProperty {
    id: string;
    type: string;
    rich_text: RichText[];
  }
  
  interface PeopleProperty {
    id: string;
    type: string;
    people: User[];
  }
  
  interface CheckboxProperty {
    id: string;
    type: string;
    checkbox: boolean;
  }
  
  interface Status {
    id: string;
    name: string;
    color: string;
  }
  
  interface StatusProperty {
    id: string;
    type: string;
    status: Status;
  }
  
  interface TitleText {
    type: string;
    text: TextContent;
    annotations: Annotations;
    plain_text: string;
    href: string | null;
  }
  
  interface TitleProperty {
    id: string;
    type: string;
    title: TitleText[];
  }
  
  interface Properties {
    Created: CreatedTimeProperty;
    Slug: FormulaProperty;
    Tags: MultiSelectProperty;
    Description: RichTextProperty;
    Author: PeopleProperty;
    Published: CheckboxProperty;
    Status: StatusProperty;
    Name: TitleProperty;
  }
  
 interface Parent {
    type: string;
    database_id: string;
  }
  
  export interface BlogI {
    id: string;
    slug: string;
    title: string;
    file: string;
    author: string;
    description: string;
    published_at: string;
    cover_image: string;
  }

export type BlogResponse = {
    body:{
      parent: string
    }
    details:BlogI
  }
  
   
  