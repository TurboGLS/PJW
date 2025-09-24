import { mdiFileExcel } from "@mdi/js";
import Icon from "@mdi/react";
import { CSVLink } from "react-csv";
import s from "./movements-filters.module.scss";
import type { Movements } from "../../entities/movements.entity";
import { useEffect, useState } from "react";
import type { Category } from "../../entities/category.entity";
import movementService from "../../services/movements.service";

interface MovementsFiltersProps {
  movements: Movements[];
  limit: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryName?: string;
}

const MovementsFilters = ({
  movements,
  limit,
  onChange,
  onCatChange,
  categoryName,
}: MovementsFiltersProps) => {
  const csvData = [
    ["ID Movimento", "Importo", "Data", "Categoria", "Descrizione"],
    ...movements!.map((item) => [
      item._id,
      item.importo,
      item.saldo,
      item.descrizioneEstesa,
    ]),
  ];

  const [categories, setCategories] = useState<Category[]>();

  const getAllCategories = async () => {
    const cat = await movementService.getAllcategories();
    setCategories(cat.data);
    return cat;
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  if (!categories) {
    return;
  }

  return (
    <div>
      <div className={s["main-container"]}>
        <div className={s["main-container__limit"]}>
          <p>N. Movimenti</p>
          <select value={limit} onChange={onChange}>
            <option value="20">20</option>
            <option value="15">15</option>
            <option value="10">10</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={s["main-container__category"]}>
          <select onChange={onCatChange} value={categoryName}>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className={s["main-container__download"]}>
          <p>Scarica CSV</p>
          <button>
            <CSVLink data={csvData} separator=";" filename="movements.csv">
              <Icon path={mdiFileExcel} size={1} />
            </CSVLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovementsFilters;
