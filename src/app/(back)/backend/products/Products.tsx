"use client"

import { useState } from "react"
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  Alert,
} from "@mui/material"
import { IconPlus } from "@tabler/icons-react"

import { Product } from "@/app/(back)/backend/types/ProductTypes"

import useProducts from "@/app/hooks/back/useProducts"

import ProductList from "@/app/components/back/products/ProductList"

import AddProductDialog from "@/app/components/back/products/AddProduct"

import ProductDetail from "@/app/components/back/products/ProductDetail"

import EditProduct from "@/app/components/back/products/EditProduct"

import DeleteProduct from "@/app/components/back/products/DeleteProduct"

import FilterSearchProduct from "@/app/components/back/products/FilterSearchProduct"

import ExportProduct from "@/app/components/back/products/ExportProduct"

type Props = {}

export default function ProductsPage({}: Props) {
  const {
    fetchProducts,
    products,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    totalCount,
    loading,
    error,
  } = useProducts()
  
  const [isDialogAddOpen, setIsDialogAddOpen] = useState(false)

  const handleProductAdded = async () => {
    await fetchProducts()
  }
  
  const handleSearchChange = (searchQuery: string) => {
    setSearchQuery(searchQuery)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("")
  }

  
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product)
    setDetailOpen(true)
  }

  const handleCloseDetails = () => {
    setDetailOpen(false)
    setSelectedProduct(null)
  }

  const [editOpen, setEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setEditOpen(true)
  }

  const handleCloseEdit = () => {
    setEditOpen(false)
    setEditingProduct(null)
  }

  const handleProductUpdated = async () => {
    await fetchProducts()
    handleCloseEdit()
  }

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingProductId, setDeletingProductId] = useState<number | null>(
    null
  )

  const handleOpenDelete = (productId: number) => {
    setDeletingProductId(productId)
    setDeleteOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false)
    setDeletingProductId(null)
  }

  const handleDeleted = async () => {
    await fetchProducts()
  }


  return (
    <>
      <Card
        sx={{ padding: 0, border: `1px solid #eee`, borderRadius: 1 }}
        variant={"outlined"}
      >
        <CardContent sx={{ pt: "16px", pb: "0px" }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography variant="h5">Products ({totalCount})</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsDialogAddOpen(true)}
            >
              <IconPlus size={16} /> &nbsp;Add Product
            </Button>
          </Stack>
        </CardContent>

        <Stack
          direction="row"
          m={2}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <FilterSearchProduct
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />
          <ExportProduct products={products} />
        </Stack>

        <Box sx={{ overflow: "auto", width: { sm: "auto" } }}>
          {loading && <LinearProgress sx={{ mx: 2, mb: 2 }} />}

          {error && !loading && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {products.length === 0 && !loading && (
            <Alert severity="info" sx={{ mx: 2, mb: 2 }}>
              No products found
            </Alert>
          )}

          {products.length > 0 && (
            <ProductList
              products={products}
              totalCount={totalCount}
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={(_event, newPage) => setPage(newPage)}
              handleChangeRowsPerPage={(event) =>
                setRowsPerPage(parseInt(event.target.value, 10))
              }
              handleOpenDetails={handleOpenDetails}
              handleOpenEdit={handleOpenEdit}
              handleOpenDelete={handleOpenDelete}
            />
          )}
        </Box>
      </Card>

      <AddProductDialog
        open={isDialogAddOpen}
        handleClose={() => setIsDialogAddOpen(false)}
        onProductAdded={handleProductAdded}
      />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          open={detailOpen}
          onClose={handleCloseDetails}
        />
      )}

      {editingProduct && (
        <EditProduct
          open={editOpen}
          product={editingProduct}
          onClose={handleCloseEdit}
          onUpdated={handleProductUpdated}
        />
      )}

      <DeleteProduct
        open={deleteOpen}
        productId={deletingProductId}
        onClose={handleCloseDelete}
        onDeleted={handleDeleted}
      />
    </>
  )
}