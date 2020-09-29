import React, { useState }  from 'react';
import { Grid, Paper, Box } from '@material-ui/core';
import Product from '../components/Product';
import './Home.css';

function Home(props) {

    return (
        <div className="home">
            <img className="home_bannerImage" src="https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/2020/TV/THBY_S2_02111_GWBleedingHero_1500x600_PRE_Final_en-US_PVD5224._CB410800060_.jpg" alt="banner"></img>
         <div className='home_row' >
            <Product
                  id="2213123221"
                  title="Flawless by Gabrielle Union - Shine Enhancing Heat Protection Hair Spray, 8 OZ"
                  price ={299.99}
                  rating={4}
                  image="https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg"
                  className=""
               />

            <Product
               id="22131d221"
               title="Flawless by Gabrielle Union - Shine Enhancing Heat Protection Hair Spray, 8 OZ"
               price ={9.99}
               rating={4}
               image="https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg"
               className=""
            />
            
         </div>
         <div className='home_row' >
            <Product
                  id="22131232541"
                  title="Flawless by Gabrielle Union - Shine Enhancing Heat Protection Hair Spray, 8 OZ"
                  price ={159.99}
                  rating={4}
                  image="https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg"
                  className=""
               />
            <Product
               id="221312324323"
               title="Flawless by Gabrielle Union - Shine Enhancing Heat Protection Hair Spray, 8 OZ"
               price ={7699.99}
               rating={5}
               image="https://images-na.ssl-images-amazon.com/images/I/61b-zD%2B-I8L._SY879_.jpg"
               className="hide"/>
            <Product
               id="22131236976"
               title="Flawless by Gabrielle Union - Shine Enhancing Heat Protection Hair Spray, 8 OZ"
               price ={1909.99}
               rating={4}
               image="https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg"
               className=""
            />
            
         </div>
         <div className='home_row' >
            <Product
                  id="22131232ddd334"
                  title="Flawless by Gabrielle Union - Shine Enhancing Heat Protection Hair Spray, 8 OZ"
                  price ={2999.99}
                  rating={4}
                  image="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6115/6115611_sd.jpg"
                  className=""
               />

            
         </div>


        </div>

        
    )
}

export default Home
