import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createRef, useEffect, useState, useRef, useReducer } from 'react'
import { View, Text, FlatList, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableNativeFeedback, StatusBar, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { Modalize } from 'react-native-modalize';
import { Searchbar } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import HeaderComponent from '../../component/HeaderComponent';
import CustomeButton from '../../helper/util/CustomeButton';
import { capitalizeFirstLetter, scaledSize } from '../../helper/util/Utilities';
import { COLORS, Fonts } from '../../utilits/GlobalAssets';
import { arrowLeftIcon, black, cement, dresses, girl, green, house, mapIcon, mobile, searchIcon, starIcon, suite, watch2 } from '../../utilits/GlobalImages';
import { UrlConstants } from '../../context/service/UrlConstants';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getReqresUser } from './ProductsSlice';
import CustomSpinner from '../../component/CustomSpinner';
const width = Dimensions.get('window').width;

interface S {
  search: any;
  //filterTabs:any;
  modalData: any;
  screenPosition: any;
  productsData: any;
  scrollLoad: boolean;
  searchProductsData: any
}
export interface Props {
  navigation: any;
  id: string;
  route: any;

}
interface SS {
  // Customizable Area Start
  id: any;
  swiper: any



  // Customizable Area End


}



const   ProductList =(props:any)=> {

const [search, setSearch] = useState('')
const [products, setProducts] = useState([])
const [modalData, setModalData] = useState([
  { type: 'home', address: 'vijay nagar', id: 1, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },
  { type: 'office', address: 'plasiya', id: 2, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },
  { type: 'office', address: 'plasiya', id: 2, image: house, rating: 4, price: 4000000, room: 2, floor: 2 },

])
const dispatch = useDispatch()
const reducer = useSelector((state:any)=>state.ProductsSlice)
useEffect(()=>{
  console.log('useeffects--------------------------------',reducer);
  
  //@ts-ignore
dispatch(getProducts({pageSize:10,pageNumber:0}))
// dispatch(getReqresUser())
},[])

  const renderItem=(item: any, index: number)=> {    
    return (
      <TouchableOpacity style={{
        height: scaledSize(264), width: '90%',marginBottom:scaledSize(4),
        alignSelf: 'center', borderWidth: 0, elevation: 4,
         borderRadius: scaledSize(10),marginTop:scaledSize(10),
        backgroundColor: 'white', justifyContent: 'center', alignContent: 'center'
      }} onPress={() => alert(item.id)}>
        <Image style={{ width: scaledSize(310), height: scaledSize(200), top: scaledSize(20), alignSelf: 'center' }} source={item.image} resizeMode='contain' />

        <View style={{ width: '100%', height: '38%', top: scaledSize(10), left: scaledSize(6) }}>
          <View style={{ height: scaledSize(50), flexDirection: 'row' }}>
            <View style={{
              flex: 1, justifyContent: "flex-start", alignItems: 'flex-start',

            }}>
              {/* <Text style={{ color: 'black', fontFamily: Fonts.bold, left: scaledSize(28), }}>{capitalizeFirstLetter(item.type)}</Text> */}
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: scaledSize(20), height: scaledSize(20), }} source={mapIcon} resizeMode='contain' />
                <Text style={{ marginLeft: scaledSize(10), color: 'black', fontFamily: Fonts.PTSerifBold, letterSpacing: 1 }}>{capitalizeFirstLetter(item.address)}</Text>
              </View>
            </View>
            <View style={{
              flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',
              flexDirection: 'row', right: scaledSize(10)
            }}>
              <Image style={{ width: scaledSize(16), height: scaledSize(16), right: scaledSize(4), bottom: scaledSize(2) }} source={starIcon} resizeMode='contain' />
              <Text style={{ fontFamily: Fonts.PTSerifBold, color: 'black' }}>4.8</Text>
            </View>

          </View>
          <View style={{ height: 20, width: '100%' }}>
            <Text style={{ fontFamily: Fonts.bold }}>{`Price/₹${item.price}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  // async onEndData() {
  //   this.setState({ scrollLoad: true })
  //   setTimeout(() => {
  //     this.setState({ productsData: this.state.productsData.concat(extraProducts) })
  //     this.setState({ scrollLoad: false })
  //   }, 2000);

  // }

  const footerLoader=()=> {
    // if (this.state.scrollLoad) return null
    return (
      <View style={{ paddingVertical: scaledSize(50) }}>
        {/* <ActivityIndicator color='red' style={{ bottom: scaledSize(40) }} animating size={'large'} /> */}
      </View>
    )
  }


  // handleSearch = (value: any) => {
  //   if (this.state.productsData && value) {
  //     let products: any;
  //     products = this.state.productsData?.filter((item: any) => {
  //       if (item && item?.name) {
  //         return item?.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
  //       }
  //     })
  //     this.setState({ searchProductsData: products })
  //   }
  // }

  
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <TextInput placeholder='Search products . . .' style={{ width: '80%', backgroundColor: COLORS.white, left: scaledSize(50), top: scaledSize(10) }} 
        value={search} onChangeText={(value: any) => { setSearch( value )}} />
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: 'absolute', left: 0, top: scaledSize(26), marginLeft: scaledSize(15) }}>
          <Image source={arrowLeftIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25),tintColor:'gray',bottom:scaledSize(4) }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', right: 0, top: scaledSize(26), marginRight: scaledSize(25) }}>
          <Image source={searchIcon} resizeMode='contain' style={{ width: scaledSize(20), height: scaledSize(25) }} />
        </TouchableOpacity>
        {/* <View style={{ flex:1,bottom:20 }}> */}
          <FlatList 
          data={modalData}
           
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item, index }) => renderItem(item, index)}
            onEndReachedThreshold={0.5}
           
            // ListFooterComponent={() =>footerLoader()}
          />
        {/* </View> */}
        <CustomSpinner isLoading={reducer?.isLoading}/>
        {/* <View style={{height:2,backgroundColor:'white'}}></View> */}
      </View>
    )
  
}

const styles = StyleSheet.create({
  titleInput: {
    color: COLORS.orange,
    top: scaledSize(-10),
    marginTop: scaledSize(-10),
    // textAlign:'center',
    letterSpacing: 1,
    fontFamily: 'Quicksand-Bold',
    // marginTop:scaledSize(10),
    fontSize: scaledSize(19),
  },
  productView: {
    // backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: scaledSize(14),
    borderColor: "#dfdfdf",
    //top: scaledSize(10),
    // margin: scaledSize(10),
    // marginLeft: scaledSize(20),
     height: scaledSize(200),
    // width: scaledSize(160)
  },
  productName: {
    fontSize: scaledSize(11), textAlign: 'center', maxWidth: scaledSize(120), justifyContent: 'center', alignItems: 'center', color: COLORS.black, fontFamily: 'Cormorant-Bold', marginTop: scaledSize(20), top: scaledSize(-10), marginRight: scaledSize(20), left: scaledSize(8), padding: scaledSize(1)
  },
  productPrice: {
    fontSize: scaledSize(11),
    textAlign: 'center',
    maxWidth: scaledSize(120),
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontFamily: 'Cormorant-Bold',
    top: scaledSize(-10),
    marginRight: scaledSize(20),
    left: scaledSize(8),
    padding: scaledSize(1)
  },
  productPrice2: {
    fontSize: scaledSize(11),
    top: scaledSize(-20),
    marginLeft: scaledSize(5),
    textAlign: 'center',
    color: COLORS.grey
  },
  productImage:
  {
    marginTop: scaledSize(20),
    width: scaledSize(135),
    height: scaledSize(120),
    marginLeft: scaledSize(5),
    marginRight: scaledSize(5),
    alignItems: 'center'
  },
});

export default ProductList