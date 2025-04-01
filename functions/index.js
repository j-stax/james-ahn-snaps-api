export const handler = async () => {
    const html = `
        <html>
            <body>
                <div style="width: 50%; margin: 5% auto; text-align: center;">
                    <h1>Welcome to my Snaps project API!</h1>
                    <p>
                        This is a simple Express server that I created for my BrainStation software engineering bootcamp photo sharing application. 
                        You can check out the source code <a href="https://github.com/j-stax/james-ahn-snaps-api" target="_blank">here.</a>
                    </p>
                    <img style="width: 100%; border-radius: 4px;" src="https://snapsapi.netlify.app/images/snaps-cover.png" alt="Image of Snaps app." />
                </div>
            </body>
        </html>
    `;

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html
    };
}