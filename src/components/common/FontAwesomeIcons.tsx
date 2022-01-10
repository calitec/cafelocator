import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faTimes,
    faClock,
    faPhoneAlt,
    faCommentDots,
    faEdit,
    faPlus,
    faDirections,
    faSearchPlus
} from "@fortawesome/free-solid-svg-icons";
interface ISearchIconProps {
    icon: string;
    color?: string;
    size?: string;
}
const FontAwesomeIcons: React.FunctionComponent<ISearchIconProps> = ({
    icon,
    color
}) => {
    // const SIZES = ["xs", "sm", "lg", "2x", "3x", "5x", "7x", "10x"];
    let val;
    switch (icon) {
        case 'search':
            val = faSearch;
            break;
        case 'close':
            val = faTimes;
            break;
        case "clock":
            val = faClock;
            break;
        case "phone":
            val = faPhoneAlt;
            break;
        case "comment":
            val = faCommentDots;
            break;
        case "review":
            val = faEdit;
            break;
        case "plus":
            val = faPlus;
            break;
        case 'direction':
            val = faDirections;
            break;
        case 'searchPlus':
            val = faSearchPlus;
            break;
        default:
            document.write("nothing");
    }
    return (
        <>
            <FontAwesomeIcon icon={val} size='sm' color={color} />
        </>
    );
};

export default FontAwesomeIcons;