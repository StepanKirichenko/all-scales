import { Star } from "@ui/icons/Star";
import { StarFilled } from "@ui/icons/StarFilled";

import "./FavoriteButton.css";

interface FavoriteButtonProps {
    isFavorite: boolean;
    onClick: () => void;
}

export function FavoriteButton(props: FavoriteButtonProps) {
    return (
        <button class="favorite-button" onClick={props.onClick}>
            {props.isFavorite ? <StarFilled /> : <Star />}
        </button>
    );
}
