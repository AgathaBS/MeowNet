from app.models.cat import Cat
from fastapi import HTTPException

def create_cat(db, current_user, payload):
    """
    Create a cat linked to the authenticated user.
    """

    cat = Cat(
        name=payload.name,
        mood=payload.mood,
        breed=payload.breed,
        age=payload.age,
        description=payload.description,
        owner_id=current_user.id
    )

    db.add(cat)
    db.commit()
    db.refresh(cat)

    return cat

def delete_cat(
    db,
    current_user,
    cat_id: int,
):
    """
    Delete a cat belonging to the
    authenticated user.
    """

    cat = (
        db.query(Cat)
        .filter(
            Cat.id == cat_id,
            Cat.owner_id == current_user.id,
        )
        .first()
    )

    if not cat:
        raise HTTPException(
            status_code=404,
            detail="Cat not found",
        )

    db.delete(cat)
    db.commit()

    return {"message": "Cat deleted"}

def get_user_cats(db, current_user):
    """
    Retrieve all cats belonging to the authenticated user.
    """

    return current_user.cats