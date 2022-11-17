import "./sticky-footer.css"

export default function StickyFooter(props) {
    return (
        <footer style={null}>
            <section>
        </section>
        <div class="footer">
        <div id="button"></div>
        <div id="container">
        <div id="cont">
        <div class="footer_center">
            {props.children}
        </div>
        </div>
        </div>
        </div>
        </footer>
        
    )
}