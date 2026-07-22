export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="50" cy="50" r="48" fill="#D4AF37" stroke="#B8960C" strokeWidth="2" />
            <text x="50" y="35" textAnchor="middle" fill="#1a1a2e" fontSize="10" fontWeight="bold">CAVEIRA'S</text>
            <text x="50" y="50" textAnchor="middle" fill="#1a1a2e" fontSize="8" fontWeight="bold">MC</text>
            <text x="50" y="65" textAnchor="middle" fill="#1a1a2e" fontSize="6">BRASIL</text>
        </svg>
    );
}
