export const handler = () => {
    const html = "<html><body><div style=\"width: 50%; margin: 5% auto; text-align: center;\"><h1>Welcome to my Snaps project API!</h1><p>This is a simple Express server that I created for my BrainStation software engineering bootcamp " +
    "photo sharing application. You can check out the source code <a href=\"https://github.com/j-stax/james-ahn-snaps-api\" target=\"_blank\">here.</a></p></div></body></html>";

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: html
    }
}