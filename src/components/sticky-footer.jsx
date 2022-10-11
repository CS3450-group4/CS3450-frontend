export default function StickyFooter(props) {
    return (
        <footer style={{backgroundColor: "red", position: "fixed", bottom: 10, height: '10vh', width: '95vw', borderRadius: 10, display: "flex", justifyContent: "center", alignItems: "center"}}>
            {props.children}
        </footer>
    )
}