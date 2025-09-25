import { mdiFileExcel } from "@mdi/js";
import Icon from "@mdi/react";
import { CSVLink } from "react-csv";
import s from "./movements-filters.module.scss";
import type { Movements } from "../../entities/movements.entity";
import { useEffect, useState } from "react";
import type { Category } from "../../entities/category.entity";
import movementService from "../../services/movements.service";
import DatePicker from "react-datepicker";

interface MovementsFiltersProps {
  movements: Movements[];
  limit: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categoryName: string;
  categoryType: string;
  onDateChange: (dataInizio: Date | null, dataFine: Date | null) => void;
}

const MovementsFilters = ({
  movements,
  limit,
  onChange,
  onCatChange,
  categoryName,
  categoryType,
  onDateChange,
}: MovementsFiltersProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dataInizio, setDataInizio] = useState<Date | null>(null);
  const [dataFine, setDataFine] = useState<Date | null>(null);

  const handleDataInizio = (date: Date | null) => {
    setDataInizio(date);
    onDateChange(date, dataFine);
  };

  const handleDataFine = (date: Date | null) => {
    setDataFine(date);
    onDateChange(dataInizio, date);
  };

  const csvData = [
    ["ID Movimento", "Importo", "Saldo", "Categoria", "Descrizione"],
    ...movements!.map((item) => [
      item._id,
      item.importo,
      item.saldo,
      item.descrizioneEstesa,
    ]),
  ];

  const getAllCategories = async () => {
    const cat = await movementService.getAllcategories();
    if (Array.isArray(cat.data)) {
      setCategories(cat.data);
    } else {
      setCategories([]);
    }
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
        <div className={s["filter-group"]}>
          <label className={s["filter-label"]}>N. Movimenti</label>
          <select
            className={s["filter-select"]}
            value={limit}
            onChange={onChange}
          >
            <option value="20">20</option>
            <option value="15">15</option>
            <option value="10">10</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={s["filter-group"]}>
          <label className={s["filter-label"]}>Categoria</label>
          <select
            className={s["filter-select"]}
            onChange={onCatChange}
            value={categoryName + "|" + categoryType}
          >
            {categories.length > 0 &&
              categories.map((category, index) =>
                category ? (
                  <option
                    key={index}
                    value={`${category.categoryName}|${category.categoryType}`}
                  >
                    {category.categoryName} ({category.categoryType})
                  </option>
                ) : null
              )}
          </select>
        </div>
        <div className={s["filter-group"]}>
          <label className={s["filter-label"]}>Data inizio</label>
          <DatePicker
            className={s["filter-datepicker"]}
            selected={dataInizio}
            onChange={handleDataInizio}
            isClearable
            placeholderText="Dal"
          />
        </div>
        <div className={s["filter-group"]}>
          <label className={s["filter-label"]}>Data fine</label>
          <DatePicker
            className={s["filter-datepicker"]}
            selected={dataFine}
            onChange={handleDataFine}
            isClearable
            placeholderText="Al"
          />
        </div>
        {!movements || movements.length === 0 ? null : (
          <div className={s["filter-group"]}>
            <label className={s["filter-label"]}>Scarica CSV</label>
            <button className={s["download-btn"]}>
              <CSVLink
                data={csvData}
                separator=";"
                filename="movements.csv"
                className={s["csv-link"]}
              >
                <Icon path={mdiFileExcel} size={1} />
              </CSVLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovementsFilters;
