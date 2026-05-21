from app.models.profile import Profile


def create_profile(db, current_user, payload):
    """
    Create a profile linked to the authenticated user.
    """

    profile = Profile(
        user_id=current_user.id,
        bio=payload.bio,
        avatar_url=payload.avatar_url
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


def get_my_profile(db, current_user):
    """
    Retrieve current authenticated user's profile.
    """

    return current_user.profile