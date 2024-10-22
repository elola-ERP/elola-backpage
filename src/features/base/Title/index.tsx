import { TitleProp } from "./type";

export default function Title({title}: TitleProp) {
    return (
        <div className="text-gray-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm">Check your store {title}, you can add, edit, and update</p>
        </div>
    )
};
