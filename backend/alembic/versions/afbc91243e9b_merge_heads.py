"""merge heads

Revision ID: afbc91243e9b
Revises: 19d6d8a90bdc, 295771882104
Create Date: 2026-03-25 22:12:49.771253

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'afbc91243e9b'
down_revision: Union[str, Sequence[str], None] = ('19d6d8a90bdc', '295771882104')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
