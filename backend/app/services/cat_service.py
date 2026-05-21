from app.models.cat import Cat


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


def get_user_cats(db, current_user):
    """
    Retrieve all cats belonging to the authenticated user.
    """

    return current_user.cats