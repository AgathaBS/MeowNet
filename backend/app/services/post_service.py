from fastapi import HTTPException, status
from app.models.post import Post
from app.models.cat import Cat


def create_post(db, current_user, payload):
    """
    Create a post for a cat owned by the authenticated user.
    """

    # 1. Get cat
    cat = db.query(Cat).filter(Cat.id == payload.cat_id).first()

    if not cat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cat not found"
        )

    # 2. SECURITY CHECK (CRITICAL)
    if cat.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You cannot post on another user's cat"
        )

    # 3. Create post
    post = Post(
        caption=payload.caption,
        image_url=payload.image_url,
        cat_id=payload.cat_id
    )

    db.add(post)
    db.commit()
    db.refresh(post)

    return post


def get_posts_by_cat(db, cat_id: int):
    """
    Get all posts for a given cat.
    """

    return db.query(Post).filter(Post.cat_id == cat_id).all()


def delete_post(db, current_user, post_id: int):
    """
    Delete a post only if it belongs to user's cat.
    """

    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    # Check ownership via cat relationship
    if post.cat.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized"
        )

    db.delete(post)
    db.commit()

    return {"message": "Post deleted"}