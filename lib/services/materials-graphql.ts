"use client"

import { useQuery, useMutation } from "@apollo/client"
import { ListMaterialsQuery }          from "@/lib/graphql/queries/listMaterials"
import { MaterialsOfOrderQuery }       from "@/lib/graphql/queries/materialsOfOrder"
import { AddMaterialToOrderMutation }  from "@/lib/graphql/mutations/addMaterialToOrder"
import { UpdateMaterialQtyMutation }   from "@/lib/graphql/mutations/updateMaterialQty"

/* catálogo global */
export const useAllMaterials = () => useQuery(ListMaterialsQuery)

/* materiales usados por orden */
export const useMaterialsOfOrder = (ordenId: string) =>
  useQuery(MaterialsOfOrderQuery, { variables: { ordenId } })

/* mutaciones */
export const useAddMaterialToOrder    = () => useMutation(AddMaterialToOrderMutation)
export const useUpdateMaterialQty     = () => useMutation(UpdateMaterialQtyMutation)
