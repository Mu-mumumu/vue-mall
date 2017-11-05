<template>
	<transition name="slide-fade">
		<div class="del_modal">
			<div>
				
				<div class="btn_warp">
					<div class="btngroup">
						<slot name='cancel'></slot>
						<slot name='comfirm'></slot>					
					</div>
				</div>				
			</div>
		</div>
	</transition>			
</template>

<script>
</script>

<style>
</style>