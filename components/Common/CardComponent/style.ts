export const style = {
    page: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    content: {
        flexGrow: 1,
        overflow: "scroll"
    },
    card: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        aspectRatio: "2 / 3"
    },
    pokeImg: {
        width: "85%",
        margin: 'auto',
        height: "100%",
        paddingBottom: '3%',
        objectFit: "contain"
    },
    pokeName: (isSize: boolean) => (
        {
        fontSize: isSize ? 'x-large' : 'large',
        margin: 'auto'
        }
    )
};