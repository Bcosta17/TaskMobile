import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import  Icon  from "react-native-vector-icons/FontAwesome";


export default function Header(){
    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="bars" color={"#FFF"} size={20} />
        </TouchableOpacity>
    )
}