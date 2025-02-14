
type LinkedinProps = {
    url: string;
}

const Linkedin: React.FC<LinkedinProps> = ({ url }) => {
    return (
        <iframe src={url} frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
    )
}

export default Linkedin;