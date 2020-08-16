import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const initialValue = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

const PromotionForm = ({id}) => {
  const [values, setValues] = useState(id ? null : initialValue);
  const history = useHistory();
  console.log(id)

  useEffect(() => {
    if(id) {
      axios.get(`http://localhost:5000/promotions/${id}`)
      .then(response => {
        setValues(response.data);
      });
    }
  },[]);

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    const method = id ? "put" : "post";
    const url = id 
      ? `http://localhost:5000/promotions/${id}` 
      : 'http://localhost:5000/promotions';

    axios[method](url, values)
      .then((response) => {
      history.push("/");
    });
  }

  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      { !values
          ? <div>Carregando</div>
          : (
          <form onSubmit={onSubmit}>
            <div className="promotion_form__group">
              <label htmlFor="title">Título</label>
              <input id="title" name="title" type="text" value={values.title} onChange={onChange} />
            </div>
            <div className="promotion_form__group">
              <label htmlFor="url">Link</label>
              <input id="url" name="url" type="text" value={values.url} onChange={onChange} />
            </div>
            <div className="promotion_form__group">
              <label htmlFor="imageUrl">Imagem (URL)</label>
              <input id="imageUrl" name="imageUrl" type="text" value={values.imageUrl} onChange={onChange} />
            </div>
            <div className="promotion_form__group">
              <label htmlFor="price">Preço</label>
              <input id="price" name="price" type="text" value={values.price} onChange={onChange} />
            </div>
            <div>
              <button type="submit">Salvar</button>
            </div>
          </form>
        )}
    </div>
  );
};

export default PromotionForm;
