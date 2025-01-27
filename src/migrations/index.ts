import * as migration_20250127_211951 from './20250127_211951'
import * as migration_20250127_212000 from './20250127_212000_add_admin_user'

export const migrations = [
  {
    up: migration_20250127_211951.up,
    down: migration_20250127_211951.down,
    name: '20250127_211951'
  },
  {
    up: migration_20250127_212000.up,
    down: migration_20250127_212000.down,
    name: '20250127_212000'
  },
]