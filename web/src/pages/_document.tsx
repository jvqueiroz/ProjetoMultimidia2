import Document, { Head, Main, NextScript, Html } from'next/document'
import { render } from 'react-dom'

class MyDocument extends Document{
    render(){
       return( 
        <Html>
            <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
        );
    }
}

export default MyDocument;