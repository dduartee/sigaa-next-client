import React from 'react';
import dompurify from 'dompurify';
export default function InnerHTMLComponent(props: { children: string }) {
    return <span dangerouslySetInnerHTML={{ __html: dompurify.sanitize(props.children) }} />;
}