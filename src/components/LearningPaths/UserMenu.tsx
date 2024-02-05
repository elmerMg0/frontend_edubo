import { BsChevronDown, BsSearch } from "react-icons/bs";
import './headerUser.css'
export function UserMenu(){
    return (
        <section className="user-menu">
            <BsSearch/>
            <div className="user-menu-img">
                <img src='https://picsum.photos/200' alt="" />
            </div>
            <div className="user-menu-pts">
                <p style={{whiteSpace: 'nowrap'}}>100 pts</p>
                <BsChevronDown/>
            </div>
        </section>
    )
}