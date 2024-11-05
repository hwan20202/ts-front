import Modal from "../components/Modal.jsx";
import PropTypes from "prop-types";
import Dropdown from "../components/Dropdown.jsx";
import {useEffect, useState} from "react";
import RadioOptions from "../components/RadioOptions.jsx";
import Divider from "../components/Divider.jsx";

const DateForm = () => {
    return (
        <div>
            <div> {/* 날짜 입력 및 표시 */}

            </div>
            <div> {/* 날짜 입력 단축키 */}

            </div>
        </div>
    );
};

const IngredientRegisterModal = ({ onClose }) => {
    const [foodGroups, setFoodGroups] = useState([]); // 식품군 리스트
    const [selectedFoodGroup, setSelectedFoodGroup] = useState(""); // 선택된 식품군
    const [ingredients, setIngredients] = useState([]); // 식품군의 포함된 재료 리스트
    const [selectedIngredients, setSelectedIngredients] = useState([]); // 선택된 식재료

    useEffect(() => {
        setFoodGroups(['list1', 'list2', 'list3']);
    }, []);

    useEffect(() => {
        console.log(`get list of ${selectedFoodGroup}`);
    }, [selectedFoodGroup]);

    useEffect(() => {
        console.log(ingredients);
    }, [ingredients]);

    const handleSelectFoodGruop = ( title ) => {
        setSelectedFoodGroup(title);
        setIngredients(['op1', 'op2', 'op3', 'op4']);
    }

    const handleSelectIngredient = ( item ) => {
        setSelectedIngredients([...selectedIngredients, item]);
        return selectedIngredients;
    }

    const handleDeleteIngredient = (item) => {
        const tmp = selectedIngredients.filter((ing)=>ing!==item);
        setSelectedIngredients(tmp);
        return selectedIngredients;
    }

    return (
        <Modal onClose={onClose}>
            <div className='grid grid-cols-2'>
                <div>
                    <Dropdown list={foodGroups} setSelected={handleSelectFoodGruop} />
                    <RadioOptions options={ingredients} onBtnClick={handleSelectIngredient}></RadioOptions>
                    <Divider />
                    <RadioOptions options={selectedIngredients} onBtnClick={handleDeleteIngredient} ></RadioOptions>
                    <Divider />
                </div>
                <div>

                </div>
            </div>
        </Modal>
        );
}

IngredientRegisterModal.propTypes = {
    onClose: PropTypes.func.isRequired,
}

export default IngredientRegisterModal;