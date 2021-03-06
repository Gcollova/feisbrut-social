import { useSelector } from 'react-redux';
import styles from './PostCard.module.scss';
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import PostReactions from '../PostReactions';
import { TiTrash } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import UrlPreview from '../UrlPreview';
import { useState } from 'react';
import { httpDELETE } from '../../libs/http';

const PostCard = ({ postContent, reloader, setReloader }) => {
    const [open, setOpen] = useState(false)
    const user = useSelector(state => state.login.value);

    const handlerDelete = () => {
        httpDELETE(`/posts/${postContent.id}`, {
            db_id: user.db_id
        })
    }

    return (
        <article className={styles.main}>
            <div className={styles.header}>
                <div className={styles.user}>
                    <Link to={'/Feisbrut-React-Social/profile'} state={postContent.authorId}>
                        <div className={styles.profileImg} style={{ backgroundImage: `url(${postContent.authorPhoto})` }}></div>
                    </Link>
                    <div className={styles.postInfo}>
                        <Link to={'/Feisbrut-React-Social/profile'} state={postContent.authorId}><p className={styles.author}>{postContent.authorName} {postContent.authorSurname}</p></Link>
                        <p className={styles.date}>
                            {formatDistance(new Date(postContent.date), new Date(), { addSuffix: true, locale: it })}
                        </p>
                    </div>

                </div>
                {postContent.authorId === user.id &&
                    <div className={styles.btn} onClick={() => setOpen(!open)}>
                        <BsThreeDots />
                        {open &&
                            <div className={styles.dropDown}>
                                <ul>
                                    {/* <li><span><BsThreeDots /></span>Modifica</li> */}
                                    <li onClick={() => handlerDelete()}><span><TiTrash /></span>Elimina</li>
                                </ul> 
                            </div>
                        }
                    </div>
                }
            </div>
            <div className={styles.content}>
                <p className={styles.postText}>{postContent.text}</p>
                {
                    postContent.url.find &&
                    <UrlPreview content={postContent.url} />
                }
                {postContent.photo &&
                    <img className={styles.postImg} src={postContent.photo} alt={postContent.author} />
                }
            </div>
            <div className={styles.footer}>
                <PostReactions reloader={reloader} setReloader={setReloader} postContent={postContent} />
            </div>
        </article>
    )
}

export default PostCard;