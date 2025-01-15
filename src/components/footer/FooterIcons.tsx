import styles from '../../styles/modules/Footer.module.css'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const FooterIcons = () => {
  return (
    <div>
      <p className={styles.copyright}>&copy; 2023 My Website. All rights reserved.</p>
      <div className={styles.icons}>
        <span>
          <GoogleIcon />
        </span>
        <span>
          <FacebookIcon />
        </span>
        <span>
          <TwitterIcon />
        </span>
        <span>
          <InstagramIcon />
        </span>
        <span>
          <SettingsOutlinedIcon />
        </span>
      </div>
    </div>
  )
}

export default FooterIcons
