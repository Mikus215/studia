const New = ({title, description, date}) => {
    return ( 
        <div className="news__container">
            <p className="news__date"><span className="news__highlight">Data:</span> {date}</p>
            <p><span className="news__highlight">Tytuł:</span> {title}</p>
            <p><span className="news__highlight">Aktualności:</span> {description}</p>
        </div>
     );
}
 
export default New;