export const style = (isLogo: boolean, isInscription: boolean) => (
    {
        logo: {
            display: isLogo ? 'visible' : 'none',
            width: "50px",
            height: "50px",
        },
        inscription: {
            display: isInscription ? 'visible' : 'none',
        }
    }
)
