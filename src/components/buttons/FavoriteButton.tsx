import './FavoriteButton.css'
import FilletHeart from "../../assets/navbarimages/hear-filled.svg?react"
import OutlineHeart from "../../assets/navbarimages/heart-outline.svg?react"

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  className?: string; 
}

const FavoriteButton = ({isFavorite, onToggleFavorite}: FavoriteButtonProps) => {
  
  return (
    <button 
    className='favorite-button' 
    onClick={onToggleFavorite}
    aria-label={isFavorite ? "Remove from favorite" : "Add to favorites"}
    >
    {isFavorite ? <FilletHeart/> : <OutlineHeart/>}
    </button>
  );
}

export default FavoriteButton;